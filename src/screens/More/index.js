/* eslint-disable react/no-multi-comp */
import React from 'react'
import * as WebBrowser from 'expo-web-browser'

import { useTheme } from '../../contexts/theme'
import { BasicLayout } from '../../layouts'
import { Centered, Icon, Item, List, Radio, TitleScreen } from '../../components'

export const More = () => {
  const theme = useTheme()

  const setTheme = value => {
    theme.setThemeName(value)
  }

  const openLink = async link => {
    await WebBrowser.openBrowserAsync(link)
  }

  function ThemeItem({ isLast, name, subtitle, title }) {
    return (
      <Item isLast={isLast} onPress={() => setTheme(name)}>
        <Item.Content>
          <Item.Title>{title}</Item.Title>
          <Item.Subtitle>{subtitle}</Item.Subtitle>
        </Item.Content>
        <Radio onPress={() => setTheme(name)} selected={theme.name === name} />
      </Item>
    )
  }

  return (
    <BasicLayout>
      <Centered withMaxSize>
        <TitleScreen>More</TitleScreen>
      </Centered>
      <List>
        <List.Title>Theme</List.Title>
        <ThemeItem name="dark" subtitle="Get that whiteness out of my sight" title="Dark mode" />
        <ThemeItem name="light" subtitle="Turn on the light" title="Light mode" />
        <ThemeItem
          isLast
          name="native"
          subtitle="Get theme from your device settings"
          title="Native mode"
        />
      </List>
      <List>
        <List.Title>Codebase</List.Title>
        <Item onPress={() => openLink('https://www.expo.io')}>
          <Item.Content>
            <Item.Title>Expo</Item.Title>
            <Item.Subtitle>Platform for universal React applications</Item.Subtitle>
          </Item.Content>
          <Icon color="dark100" name="external-link" size={20} />
        </Item>
        <Item isLast onPress={() => openLink('https://www.themoviedb.org')}>
          <Item.Content>
            <Item.Title>The movie database</Item.Title>
            <Item.Subtitle>Community built movie and TV database</Item.Subtitle>
          </Item.Content>
          <Icon color="dark100" name="external-link" size={20} />
        </Item>
      </List>
    </BasicLayout>
  )
}
