import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { api } from '../utils/api';

const IdeaCard = ({ idea, onVote, showRanking = false, rank = null }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    checkIfVoted();
  }, [idea.id]);

  const checkIfVoted = async () => {
    try {
      const votedIds = await AsyncStorage.getItem('votedIdeas');
      const votedArray = votedIds ? JSON.parse(votedIds) : [];
      setHasVoted(votedArray.includes(idea.id));
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  const handleVote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      if (hasVoted) {
        // If already voted, downvote (remove vote)
        await api.downvoteIdea(idea.id);
        
        // Update local storage - remove from voted ideas
        const votedIds = await AsyncStorage.getItem('votedIdeas');
        const votedArray = votedIds ? JSON.parse(votedIds) : [];
        const updatedVotedArray = votedArray.filter(id => id !== idea.id);
        await AsyncStorage.setItem('votedIdeas', JSON.stringify(updatedVotedArray));
        
        setHasVoted(false);
        onVote && onVote(idea.id, -1); // Pass -1 to indicate downvote
        
        Alert.alert('Vote Removed', 'Your vote has been removed!');
      } else {
        // If not voted, upvote
        await api.voteForIdea(idea.id);
        
        // Update local storage - add to voted ideas
        const votedIds = await AsyncStorage.getItem('votedIdeas');
        const votedArray = votedIds ? JSON.parse(votedIds) : [];
        votedArray.push(idea.id);
        await AsyncStorage.setItem('votedIdeas', JSON.stringify(votedArray));
        
        setHasVoted(true);
        onVote && onVote(idea.id, 1); // Pass 1 to indicate upvote
        
        Alert.alert('Success', 'Your vote has been recorded!');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to ${hasVoted ? 'remove vote' : 'vote'}. Please try again.`);
    } finally {
      setIsVoting(false);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getRankingIcon = (rank) => {
    switch (rank) {
      case 1: 
        return <FontAwesome5 name="trophy" size={20} color="#FFD700" style={styles.trophyIcon} />;
      case 2: 
        return <FontAwesome5 name="medal" size={20} color="#C0C0C0" style={styles.medalIcon} />;
      case 3: 
        return <FontAwesome5 name="medal" size={20} color="#CD7F32" style={styles.medalIcon} />;
      default: 
        return <Text style={styles.rankNumber}>{rank}.</Text>;
    }
  };

  const truncatedDescription = idea.description.length > 100
    ? idea.description.substring(0, 100) + '...'
    : idea.description;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          {showRanking && (
            <View style={styles.rankingInline}>{getRankingIcon(rank)}</View>
          )}
          <Text style={styles.name}>{idea.name}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>AI: {idea.rating}/100</Text>
        </View>
      </View>
      
      <Text style={styles.tagline}>{idea.tagline}</Text>
      
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.description}>
          {showFullDescription ? idea.description : truncatedDescription}
        </Text>
        {idea.description.length > 100 && (
          <Text style={styles.readMore}>
            {showFullDescription ? 'Read Less' : 'Read More'}
          </Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.voteButton,
            hasVoted && styles.votedButton,
            isVoting && styles.votingButton,
          ]}
          onPress={handleVote}
          disabled={isVoting}
        >
          <View style={styles.voteButtonContent}>
            <Text style={[
              styles.voteButtonText,
              hasVoted && styles.votedButtonText,
            ]}>
              {isVoting ? 'Processing...' : hasVoted ? 'Remove Vote' : 'Upvote'}
            </Text>
            <MaterialIcons 
              name={hasVoted ? "keyboard-arrow-down" : "keyboard-arrow-up"}
              size={18} 
              color="#fff" 
              style={styles.voteIcon}
            />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.votes}>{idea.votes} votes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  ranking: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  rankingInline: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 24,
  },
  trophyIcon: {
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  medalIcon: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  rankNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    color: '#2d5a2d',
    fontWeight: '600',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 4,
  },
  readMore: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  voteButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  voteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteIcon: {
    marginLeft: 4,
  },
  votedButton: {
    backgroundColor: '#FF3B30', // Red color for downvote
  },
  votingButton: {
    backgroundColor: '#999',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  votedButtonText: {
    color: '#fff',
  },
  votes: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});

export default IdeaCard;