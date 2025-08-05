import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { api } from '../utils/api';
import IdeaCard from '../components/IdeaCard';

const ListingScreen = () => {
  const [ideas, setIdeas] = useState([]);
  const [sortedIdeas, setSortedIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'votes', 'rating'

  const fetchIdeas = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setIsRefreshing(true);
      else setIsLoading(true);

      const fetchedIdeas = await api.getAllIdeas();
      setIdeas(fetchedIdeas);
      applySorting(fetchedIdeas, sortBy);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const applySorting = (ideasToSort, sortType) => {
    let sorted = [...ideasToSort];
    
    switch (sortType) {
      case 'votes':
        sorted.sort((a, b) => b.votes - a.votes);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    
    setSortedIdeas(sorted);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    applySorting(ideas, sortType);
  };

  const handleVote = (ideaId, voteDelta = 1) => {
    // Update the local state to reflect the vote change
    const updatedIdeas = ideas.map(idea => 
      idea.id === ideaId ? { ...idea, votes: Math.max(0, idea.votes + voteDelta) } : idea
    );
    setIdeas(updatedIdeas);
    applySorting(updatedIdeas, sortBy);
  };

  const onRefresh = () => {
    fetchIdeas(true);
  };

  useFocusEffect(
    useCallback(() => {
      fetchIdeas();
    }, [])
  );

  const renderSortButton = (type, label, iconName) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        sortBy === type && styles.activeSortButton,
      ]}
      onPress={() => handleSort(type)}
    >
      <View style={styles.sortButtonContent}>
        <MaterialIcons 
          name={iconName} 
          size={16} 
          color={sortBy === type ? '#fff' : '#007AFF'} 
          style={styles.sortIcon}
        />
        <Text style={[
          styles.sortButtonText,
          sortBy === type && styles.activeSortButtonText,
        ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderIdeaCard = ({ item }) => (
    <IdeaCard idea={item} onVote={handleVote} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Ideas Yet</Text>
      <Text style={styles.emptyStateText}>
        Be the first to submit a startup idea!
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading ideas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Startup Ideas</Text>
        <Text style={styles.subtitle}>
          {sortedIdeas.length} idea{sortedIdeas.length !== 1 ? 's' : ''} submitted
        </Text>
      </View>

      <View style={styles.sortContainer}>
        {renderSortButton('newest', 'Newest', 'schedule')}
        {renderSortButton('votes', 'Most Voted', 'local-fire-department')}
        {renderSortButton('rating', 'Highest Rated', 'star')}
      </View>

      <FlatList
        data={sortedIdeas}
        renderItem={renderIdeaCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={sortedIdeas.length === 0 ? styles.emptyContainer : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeSortButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sortButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortIcon: {
    marginRight: 4,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeSortButtonText: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ListingScreen;