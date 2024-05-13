import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { SPACINGS } from '@corrbo/module-theme'
import { HomeNews } from 'templates/HomeNews/homeNews.component'
import { HomeActivities } from 'templates/HomeActivities/homeActivities.component'
import { Screen } from 'templates/Screen'
import { HomeServices } from 'templates/HomeServices'
import { useNewsListHomeAdapter } from 'blms/NewsBlm/ui-adapters/newsListHome.adapter'
import { useVotesListHomeAdapter } from 'blms/VotesBlm/ui-adapters/votesListHome.adapter'
import { useInitialScreenAdapter } from '@corrbo/module-navigation/blm/ui-adapters/initial-screen.adapter'
import { useApplicationsListHomeAdapter } from 'blms/ApplicationsBlm/ui-adapters'

export const HomeScreen = observer(() => {
  const { initialScreen, isNavigationReady } = useInitialScreenAdapter()

  const {
    data: newsList,
    onPress: newsOnPress,
    listLoading: newsLoading,
  } = useNewsListHomeAdapter()
  const {
    data: votingList,
    listLoading: votingListLoading,
    count: votingMaxCount,
    onPressAll: voteOnePressAll,
    onPress: voteOnPress,
    onPressNew: voteOnPressNew,
  } = useVotesListHomeAdapter()
  const {
    data: applicationsList,
    listLoading: applicationsListLoading,
    count: applicationsMaxCount,
    onPressAll: applicationOnePressAll,
    onPress: applicationOnPress,
    onPressNew: applicationOnPressNew,
  } = useApplicationsListHomeAdapter()

  const activities = useMemo(
    () =>
      [
        {
          title: 'Заявки',
          count: applicationsMaxCount,
          data: applicationsList,
          onPress: applicationOnPress,
          onPressAll: applicationOnePressAll,
          onPressNew: applicationOnPressNew,
          newText: 'Новая заявка',
        },
        {
          title: 'Голосования',
          count: votingMaxCount,
          data: votingList,
          onPress: voteOnPress,
          onPressAll: voteOnePressAll,
          onPressNew: voteOnPressNew,
          newText: 'Новое голосование',
        },
      ].filter(item => !!item.data.length),
    [
      applicationOnPress,
      applicationOnPressNew,
      applicationOnePressAll,
      applicationsList,
      applicationsMaxCount,
      voteOnPress,
      voteOnPressNew,
      voteOnePressAll,
      votingList,
      votingMaxCount,
    ],
  )

  return !!initialScreen && isNavigationReady ? (
    <Screen
      inBottomBar
      isLoading={newsLoading || votingListLoading || applicationsListLoading}
      headerProps={{
        title: 'Главная',
        profile: true,
        paddingHor: SPACINGS.container_20,
      }}
      scroll
      content={(fullHeight, animationFinished) => (
        <>
          <HomeNews
            data={
              newsList.length
                ? animationFinished
                  ? newsList
                  : [newsList[0]]
                : []
            }
            onPress={newsOnPress}
          />
          <HomeActivities activities={activities} />
          <HomeServices />
        </>
      )}
    />
  ) : null
})
