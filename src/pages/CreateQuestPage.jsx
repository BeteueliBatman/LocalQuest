import { ArrowRight, Lightbulb, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { DEFAULT_CITY, getCitiesForRegion, regions } from '../data/locations'
import { categories, getStepsForCategory } from '../data/quests'
import useAuth from '../hooks/useAuth'
import { createQuest } from '../services/api'
import useQuestStore from '../store/useQuestStore'

const CreateQuestPage = () => {
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()
  const addCreatedQuest = useQuestStore((state) => state.addCreatedQuest)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      region: 'Tbilisi',
      place: '',
      category: 'Outdoors',
      difficulty: 'Easy',
      duration: '30 min',
      description: '',
    },
  })

  const onSubmit = async (values) => {
    setServerError('')

    try {
      const apiQuest = await createQuest(values, user.id)
      const category = categories.find((item) => item.name === values.category)
      const regionCities = getCitiesForRegion(values.region)
      const placeText = values.place.toLowerCase()
      const matchingCity = regionCities.find(({ name }) =>
        placeText.includes(name.toLowerCase()),
      )
      const city = matchingCity?.name || regionCities[0]?.name || DEFAULT_CITY
      const newQuest = {
        id: `created-${apiQuest.id}-${Date.now()}`,
        title: values.title,
        category: values.category,
        region: values.region,
        city,
        difficulty: values.difficulty,
        duration: values.duration,
        location: values.place,
        description: values.description,
        points:
          values.difficulty === 'Hard'
            ? 220
            : values.difficulty === 'Medium'
              ? 150
              : 90,
        image: category?.image || '/images/old-town.jpg',
        steps: getStepsForCategory(values.category),
        createdByUser: true,
      }

      addCreatedQuest(newQuest)
      navigate(`/quests/${newQuest.id}`, {
        state: { message: 'Your quest was created and added to your list.' },
      })
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <section className="create-page">
      <div className="container create-layout">
        <div className="create-intro">
          <span className="hero-label">
            <Lightbulb size={17} aria-hidden="true" />
            Share your local idea
          </span>
          <h1>Create a new quest.</h1>
          <p>
            Keep it realistic, friendly and simple enough to complete in one
            day.
          </p>
          <div className="form-tips">
            <span>
              <ArrowRight aria-hidden="true" /> Give it a clear title
            </span>
            <span>
              <ArrowRight aria-hidden="true" /> Pick a real place
            </span>
            <span>
              <ArrowRight aria-hidden="true" /> Explain the small goal
            </span>
          </div>
        </div>

        <form
          className="form create-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-heading">
            <span className="eyebrow">Quest details</span>
            <h2>Tell us about your idea</h2>
          </div>

          <label className="form-field form-field--full">
            <span>Quest title</span>
            <input
              type="text"
              id="quest-title"
              placeholder="Example: Sunrise photo walk"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'quest-title-error' : undefined}
              {...register('title', {
                required: 'Title is required.',
                setValueAs: (value) => value.trim(),
                minLength: {
                  value: 5,
                  message: 'Use at least 5 characters.',
                },
                maxLength: {
                  value: 70,
                  message: 'Keep the title under 70 characters.',
                },
              })}
            />
            {errors.title && (
              <small className="form-error" id="quest-title-error">
                {errors.title.message}
              </small>
            )}
          </label>

          <label className="form-field">
            <span>Region</span>
            <select {...register('region')}>
              {regions.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Specific place</span>
            <input
              type="text"
              id="quest-place"
              placeholder="Example: Batumi Boulevard"
              aria-invalid={Boolean(errors.place)}
              aria-describedby={errors.place ? 'quest-place-error' : undefined}
              {...register('place', {
                required: 'Specific place is required.',
                setValueAs: (value) => value.trim(),
                minLength: {
                  value: 3,
                  message: 'Use at least 3 characters.',
                },
                maxLength: {
                  value: 100,
                  message: 'Keep the place under 100 characters.',
                },
                pattern: {
                  value: /^[a-zA-Zა-ჰ0-9\s.,'()-]+$/,
                  message: 'Use a simple place name or address.',
                },
              })}
            />
            {errors.place && (
              <small className="form-error" id="quest-place-error">
                {errors.place.message}
              </small>
            )}
          </label>

          <label className="form-field">
            <span>Category</span>
            <select {...register('category')}>
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Difficulty</span>
            <select {...register('difficulty')}>
              {['Easy', 'Medium', 'Hard'].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field form-field--full">
            <span>Estimated time</span>
            <select {...register('duration')}>
              {['15 min', '30 min', '60 min', '90 min', '2 hours'].map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="form-field form-field--full">
            <span>Description</span>
            <textarea
              rows="5"
              id="quest-description"
              placeholder="What should someone do to complete this quest?"
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? 'quest-description-error' : undefined
              }
              {...register('description', {
                required: 'Description is required.',
                setValueAs: (value) => value.trim(),
                minLength: {
                  value: 20,
                  message: 'Write at least 20 characters.',
                },
                maxLength: {
                  value: 300,
                  message: 'Keep it under 300 characters.',
                },
              })}
            />
            {errors.description && (
              <small className="form-error" id="quest-description-error">
                {errors.description.message}
              </small>
            )}
          </label>

          {serverError && (
            <p className="form-server-error form-field--full" role="alert">
              {serverError}
            </p>
          )}

          <Button
            className="button--full form-field--full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating quest...' : 'Publish quest'}
            {!isSubmitting && <Send size={17} aria-hidden="true" />}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default CreateQuestPage
