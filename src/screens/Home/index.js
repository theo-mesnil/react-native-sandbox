import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { BasicLayout } from '../../layouts/Basic'
import { Centered } from '../../components/Centered'
import { formatGenres } from '../../utils/formatGenres'
import { getGenres } from '../../api/genres'
import { getImageUrl } from '../../constants/image'
import { getTrending } from '../../api/trending'
import { Listing, ListingItem, ListingLoader } from '../../components/Listing'
import { Section } from '../../components/Section'
import { Thumb } from '../../components/Thumb'
import { TitleScreen } from '../../components/TitleScreen'

export const Home = ({ navigation }) => {
  const [moviesTrending, setMoviesTrending] = useState()
  const [moviesGenre, setMovieGenre] = useState()
  const [showsTrending, setShowsTrending] = useState()
  const [showsGenre, setShowsGenre] = useState()
  const [peoplesTrending, setPeoplesTrending] = useState()

  useEffect(() => {
    setTimeout(() => {
      getGenres(setMovieGenre)
      getTrending(setMoviesTrending)
      getGenres(setShowsGenre, 'tv')
      getTrending(setShowsTrending, 'tv')
      getTrending(setPeoplesTrending, 'person')
    }, 1000)
  }, [])

  return (
    <BasicLayout>
      <ScrollView>
        <Centered>
          <TitleScreen>Home</TitleScreen>
        </Centered>
        <Section onPress={() => navigation.navigate('Shows')} title="Trendy TvShows">
          {showsTrending && showsTrending.results && showsGenre ? (
            <Listing
              data={showsTrending.results}
              keyExtractor={item => `${item.id}`}
              renderItem={({ index, item }) => (
                <ListingItem isFirst={index === 0} numberOfColumns={2} numberOfColumnsTablet={3}>
                  <Thumb
                    backgroundUri={getImageUrl(item.poster_path)}
                    onPress={() => navigation.navigate('Show')}
                  />
                </ListingItem>
              )}
            />
          ) : (
            <ListingLoader numberOfColumns={2} numberOfColumnsTablet={3} withoutTitle />
          )}
        </Section>
        <Section onPress={() => navigation.navigate('Movies')} title="Trendy movies">
          {moviesTrending && moviesTrending.results && moviesGenre ? (
            <Listing
              data={moviesTrending.results}
              keyExtractor={item => `${item.id}`}
              renderItem={({ index, item }) => (
                <ListingItem isFirst={index === 0} numberOfColumns={2} numberOfColumnsTablet={3}>
                  <Thumb
                    aspectRatio={16 / 9}
                    backgroundUri={getImageUrl(item.backdrop_path)}
                    onPress={() => navigation.navigate('Movie')}
                    subtitle={!!moviesGenre && formatGenres(moviesGenre.genres, item.genre_ids)}
                    title={item.title}
                  />
                </ListingItem>
              )}
            />
          ) : (
            <ListingLoader aspectRatio={16 / 9} numberOfColumns={2} numberOfColumnsTablet={3} />
          )}
        </Section>
        <Section title="Trendy People">
          {peoplesTrending && peoplesTrending.results ? (
            <Listing
              data={peoplesTrending.results}
              keyExtractor={item => `${item.id}`}
              renderItem={({ index, item }) => (
                <ListingItem isFirst={index === 0}>
                  <Thumb
                    backgroundUri={getImageUrl(item.profile_path)}
                    onPress={() => navigation.navigate('Movie')}
                    title={item.name}
                  />
                </ListingItem>
              )}
            />
          ) : (
            <ListingLoader />
          )}
        </Section>
      </ScrollView>
    </BasicLayout>
  )
}
