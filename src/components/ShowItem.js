import React, { memo } from 'react'
import { useNavigation } from '@react-navigation/native'

import { getImageUrl } from '../constants/image'

import { Box } from './Box'
import { Thumb } from './Thumb'
import { Icon, TvIcon } from './Icons'

export const ShowItem = memo(function ShowItem({
  item,
  numberOfColumns,
  onLongPress,
  subtitle,
  withTitle
}) {
  const navigation = useNavigation()

  return (
    <Box flex={1 / numberOfColumns} px="xxs" py="xxs">
      <Thumb
        backgroundUri={!!item.poster_path && getImageUrl(item.poster_path)}
        iconNoContent={<Icon icon={TvIcon} opacity="0.6" size="40" />}
        onLongPress={onLongPress}
        onPress={() => {
          navigation.push('Show', { id: item.id })
        }}
        subtitle={subtitle}
        title={withTitle && item.name}
      />
    </Box>
  )
})
