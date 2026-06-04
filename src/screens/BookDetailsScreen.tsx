import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetails'>;

export default function BookDetailsScreen({ route }: Props) {
  const { title, releaseDate, cover, description, pages } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{releaseDate}</Text>
        <Image source={{ uri: cover }} style={styles.cover} />
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.body}>{description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Pages:</Text>
          <Text style={styles.metaValue}>{pages}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  cover: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  metaLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaValue: {
    fontSize: 16,
  },
});
