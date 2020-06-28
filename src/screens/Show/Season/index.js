import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import i18n from 'i18n-js'

import { BasicLayout } from '../../../layouts'
import {
  Box,
  Centered,
  Header,
  Icon,
  Text,
  Thumb,
  ThumbLoader,
  TvIcon,
  VoteAverage
} from '../../../components'
import { useGetSeasonDetail } from '../../../api/show'
import { getImageUrl } from '../../../constants/image'

import * as S from './styled'

export function Season() {
  const route = useRoute()
  const [seasonDetail, setSeasonDetail] = useState()
  const seasonName = route.params.seasonName
  const showId = route.params.id
  const seasonNumber = route.params.seasonNumber
  const getSeasonDetail = useGetSeasonDetail()

  useEffect(() => {
    getSeasonDetail(setSeasonDetail, showId, seasonNumber)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonNumber, showId])

  return (
    <BasicLayout>
      <Header title={seasonName} withBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Centered marginTop={70} withMaxSize>
          {seasonDetail ? (
            <Box mt={40}>
              {seasonDetail.episodes.map(episode => (
                <S.Episode key={episode.name}>
                  <Box mb="md" mr="sm" width="100%">
                    <Thumb
                      aspectRatio={16 / 9}
                      backgroundUri={!!episode.still_path && getImageUrl(episode.still_path)}
                      iconNoContent={<Icon icon={TvIcon} opacity="0.6" size="40" />}
                    />
                  </Box>
                  <Text fontSize="h3" mb="sm" numberOfLines={3} weight="bold">
                    {`${episode.episode_number}. ${episode.name}`}
                  </Text>
                  {!!episode.overview && <Text color="dark400">{episode.overview}</Text>}
                  <Box
                    alignItems="flex-end"
                    flexDirection="row"
                    justifyContent="space-between"
                    mt="sm"
                  >
                    {!!episode.vote_average && (
                      <VoteAverage vote={episode.vote_average} weight="regular" />
                    )}
                    <Text>{format(new Date(episode.air_date), i18n.t('date.air_date'))}</Text>
                  </Box>
                </S.Episode>
              ))}
            </Box>
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <Box mt={40}>
              {['1', '2', '3', '4', '5'].map(item => (
                <Box
                  backgroundColor="light600"
                  borderRadius="md"
                  key={item}
                  mb="xl"
                  paddingBottom="sm"
                  paddingLeft="sm"
                  paddingRight="sm"
                  paddingTop="sm"
                >
                  <Box mr="sm" width="100%">
                    <ThumbLoader aspectRatio={16 / 9} />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Centered>
      </ScrollView>
    </BasicLayout>
  )
}
