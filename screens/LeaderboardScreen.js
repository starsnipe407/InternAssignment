import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { api } from '../utils/api';
import IdeaCard from '../components/IdeaCard';

const LeaderboardScreen = () => {
  const [topIdeas, setTopIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeaderboard = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setIsRefreshing(true);
      else setIsLoading(true);

      const leaderboardData = await api.getLeaderboard();
      // Limit to top 3 ideas
      setTopIdeas(leaderboardData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleVote = (ideaId, voteDelta = 1) => {
    // Update the local state to reflect the vote change
    const updatedIdeas = topIdeas.map(idea => 
      idea.id === ideaId ? { ...idea, votes: Math.max(0, idea.votes + voteDelta) } : idea
    );
    // Re-sort after voting
    const sortedIdeas = updatedIdeas.sort((a, b) => b.votes - a.votes);
    setTopIdeas(sortedIdeas);
  };

  const onRefresh = () => {
    fetchLeaderboard(true);
  };

  useFocusEffect(
    useCallback(() => {
      fetchLeaderboard();
    }, [])
  );

  const renderLeaderboardItem = ({ item, index }) => (
    <IdeaCard 
      idea={item} 
      onVote={handleVote}
      showRanking={true}
      rank={index + 1}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="emoji-events" size={64} color="#ddd" />
      <Text style={styles.emptyStateTitle}>No Leaders Yet</Text>
      <Text style={styles.emptyStateText}>
        Submit and vote for ideas to see the leaderboard!
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading leaderboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Entypo name="trophy" size={32} color="#FFD700" />
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <Text style={styles.subtitle}>
          Top {topIdeas.length} most voted startup ideas
        </Text>
      </View>

      {topIdeas.length > 0 && (
        <View style={styles.podiumContainer}>
          <View style={styles.podium}>
            {topIdeas[1] && (
              <View style={styles.podiumPosition}>
                <FontAwesome5 name="medal" size={32} color="#C0C0C0" />
                <Text style={styles.podiumName} numberOfLines={1}>
                  {topIdeas[1].name}
                </Text>
                <Text style={styles.podiumVotes}>{topIdeas[1].votes} votes</Text>
              </View>
            )}
            
            {topIdeas[0] && (
              <View style={[styles.podiumPosition, styles.firstPlace]}>
                <FontAwesome5 name="trophy" size={32} color="#FFD700" />
                <Text style={styles.podiumName} numberOfLines={1}>
                  {topIdeas[0].name}
                </Text>
                <Text style={styles.podiumVotes}>{topIdeas[0].votes} votes</Text>
              </View>
            )}
            
            {topIdeas[2] && (
              <View style={styles.podiumPosition}>
                <FontAwesome5 name="medal" size={32} color="#CD7F32" />
                <Text style={styles.podiumName} numberOfLines={1}>
                  {topIdeas[2].name}
                </Text>
                <Text style={styles.podiumVotes}>{topIdeas[2].votes} votes</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <FlatList
        data={topIdeas}
        renderItem={renderLeaderboardItem}
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
        contentContainerStyle={topIdeas.length === 0 ? styles.emptyContainer : null}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: 'black',
    // backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  podiumContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  podiumPosition: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    minHeight: 100,
    justifyContent: 'center',
  },
  firstPlace: {
    backgroundColor: '#fff3cd',
    borderWidth: 2,
    borderColor: '#ffc107',
    transform: [{ scale: 1.1 }],
    minHeight: 120,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 8,
  },
  podiumVotes: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
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
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default LeaderboardScreen;