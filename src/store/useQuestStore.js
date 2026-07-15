import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_CITY, regions } from '../data/locations'

const cityList = regions.flatMap((region) =>
  region.cities.map((city) => ({ ...city, region: region.name })),
)

const updateOldQuestLocation = (quest) => {
  if (quest.city && quest.region) return quest

  const oldLocation = String(quest.city || quest.location || '').toLowerCase()
  const savedCity = cityList.find(
    ({ name }) => name.toLowerCase() === oldLocation,
  )
  const fallbackCity = cityList.find(({ name }) => name === DEFAULT_CITY)
  const location = savedCity || fallbackCity

  return {
    ...quest,
    city: location.name,
    region: location.region,
  }
}

const useQuestStore = create(
  persist(
    (set) => ({
      joinedQuestIds: [],
      completedQuestIds: [],
      createdQuests: [],

      joinQuest: (questId) =>
        set((state) => {
          const id = String(questId)

          if (state.joinedQuestIds.includes(id)) return state

          return {
            joinedQuestIds: [...state.joinedQuestIds, id],
          }
        }),

      toggleQuestComplete: (questId) =>
        set((state) => {
          const id = String(questId)
          const isCompleted = state.completedQuestIds.includes(id)

          return {
            completedQuestIds: isCompleted
              ? state.completedQuestIds.filter((item) => item !== id)
              : [...state.completedQuestIds, id],
          }
        }),

      addCreatedQuest: (quest) =>
        set((state) => ({
          createdQuests: [quest, ...state.createdQuests],
          joinedQuestIds: [quest.id, ...state.joinedQuestIds],
        })),
    }),
    {
      name: 'localquest-progress',
      version: 1,
      migrate: (savedState, version) => {
        if (version === 0) {
          return {
            ...savedState,
            createdQuests: (savedState.createdQuests || []).map(
              updateOldQuestLocation,
            ),
          }
        }

        return savedState
      },
    },
  ),
)

export default useQuestStore
