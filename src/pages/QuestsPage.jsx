import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageSection from '../components/PageSection'
import QuestFilters from '../components/QuestFilters'
import QuestGrid from '../components/QuestGrid'
import { ALL_REGIONS, getRegionNames } from '../data/locations'
import { getCategoryNames, normalizeQuestList } from '../data/quests'
import useFetch from '../hooks/useFetch'
import { QUESTS_URL } from '../services/api'
import useQuestStore from '../store/useQuestStore'

const QuestsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const { data, loading, error, refetch } = useFetch(QUESTS_URL)
  const createdQuests = useQuestStore((state) => state.createdQuests)
  const completedQuestIds = useQuestStore((state) => state.completedQuestIds)
  const categoryNames = getCategoryNames()
  const regionNames = getRegionNames()
  const categoryParam = searchParams.get('category')
  const regionParam = searchParams.get('region')
  const category = categoryNames.includes(categoryParam) ? categoryParam : 'All'
  const region = regionNames.includes(regionParam) ? regionParam : ALL_REGIONS

  const quests = useMemo(
    () => [...createdQuests, ...normalizeQuestList(data?.todos)],
    [createdQuests, data],
  )

  const filteredQuests = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return quests.filter((quest) => {
      const matchesSearch =
        !searchText ||
        quest.title.toLowerCase().includes(searchText) ||
        quest.location.toLowerCase().includes(searchText) ||
        quest.city.toLowerCase().includes(searchText) ||
        quest.region.toLowerCase().includes(searchText)
      const matchesCategory = category === 'All' || quest.category === category
      const matchesDifficulty =
        difficulty === 'All' || quest.difficulty === difficulty
      const matchesRegion = region === ALL_REGIONS || quest.region === region

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesRegion
      )
    })
  }, [category, difficulty, quests, region, search])

  const updateParam = (name, value, defaultValue) => {
    const nextParams = new URLSearchParams(searchParams)

    if (value === defaultValue) {
      nextParams.delete(name)
    } else {
      nextParams.set(name, value)
    }

    setSearchParams(nextParams)
  }

  const handleRegionChange = (nextRegion) => {
    const nextParams = new URLSearchParams(searchParams)

    if (nextRegion === ALL_REGIONS) {
      nextParams.delete('region')
    } else {
      nextParams.set('region', nextRegion)
    }

    nextParams.delete('city')
    setSearchParams(nextParams)
  }

  const showSavedQuests = createdQuests.length > 0
  const canShowQuestGrid = (!loading && !error) || showSavedQuests

  return (
    <>
      <section className="page-hero page-hero--quests">
        <div className="container">
          <span className="eyebrow">Explore Georgia</span>
          <h1>Find your next small adventure.</h1>
          <p>
            Choose a region, then find a small challenge you can actually do
            today.
          </p>
        </div>
      </section>

      <PageSection className="quests-section">
        <QuestFilters
          search={search}
          category={category}
          difficulty={difficulty}
          region={region}
          categories={categoryNames}
          regions={regionNames}
          onSearchChange={setSearch}
          onCategoryChange={(value) => updateParam('category', value, 'All')}
          onDifficultyChange={setDifficulty}
          onRegionChange={handleRegionChange}
        />

        {canShowQuestGrid && (
          <p className="results-count" aria-live="polite">
            Showing <strong>{filteredQuests.length}</strong>{' '}
            {filteredQuests.length === 1 ? 'quest' : 'quests'}
          </p>
        )}

        {loading && !showSavedQuests && <LoadingState />}
        {loading && showSavedQuests && (
          <p className="inline-status" role="status">
            Loading more quests...
          </p>
        )}
        {error && !showSavedQuests && (
          <ErrorState message={error} onRetry={refetch} />
        )}
        {error && showSavedQuests && (
          <div className="inline-notice" role="alert">
            <span>
              Community quests could not load. Your saved quests are still
              available.
            </span>
            <button type="button" onClick={refetch}>
              Try again
            </button>
          </div>
        )}
        {canShowQuestGrid && (
          <QuestGrid
            quests={filteredQuests}
            completedQuestIds={completedQuestIds}
          />
        )}
      </PageSection>
    </>
  )
}

export default QuestsPage
