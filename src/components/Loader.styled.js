/* eslint-disable react/no-multi-comp */
import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { useTheme } from '../contexts/theme'

export function ShapeLoader({
  children,
  delay,
  size,
  linearStartPosition = [0.2, 0.3],
  style,
  colors,
  ...rest
}) {
  const theme = useTheme()
  const startValue = 0.1
  const [fadeAnim] = useState(new Animated.Value(startValue))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(fadeAnim, {
          toValue: startValue,
          duration: 500,
          useNativeDriver: false
        })
      ])
    ).start()
  })

  return (
    <Animated.View
      style={{
        ...style,
        overflow: 'hidden',
        opacity: fadeAnim,
        height: size
      }}
      {...rest}
    >
      <>
        {children}
        <LinearGradient
          colors={colors || [theme.values.colors.light400, theme.values.colors.light500]}
          start={linearStartPosition}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
          }}
        />
      </>
    </Animated.View>
  )
}

export function LineGradient({ size = 'md', style, ...rest }) {
  const getSize = {
    sm: 5,
    md: 10,
    lg: 20
  }

  return (
    <ShapeLoader
      linearStartPosition={[0, 0]}
      size={getSize[size] || size}
      style={{ ...style, borderRadius: getSize['lg'] }}
      {...rest}
    />
  )
}
