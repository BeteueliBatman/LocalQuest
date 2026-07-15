import {
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageSection from '../components/PageSection'
import QuestGrid from '../components/QuestGrid'
import WeatherCard from '../components/WeatherCard'
import {
  ALL_REGIONS,
  DEFAULT_CITY,
  getCitiesForRegion,
  getRegionNames,
} from '../data/locations'
import { categories, curatedQuestIds, normalizeQuestList } from '../data/quests'
import useFetch from '../hooks/useFetch'
import { QUESTS_URL } from '../services/api'

const HomePage = () => {
  const navigate = useNavigate()
  const [region, setRegion] = useState('Tbilisi')
  const { data, loading, error, refetch } = useFetch(QUESTS_URL)
  const featuredQuests = useMemo(
    () => normalizeQuestList(data?.todos).slice(0, 3),
    [data],
  )
  const weatherCity = getCitiesForRegion(region)[0]?.name || DEFAULT_CITY

  const handleLocationSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()

    if (region !== ALL_REGIONS) params.set('region', region)

    const query = params.toString()
    navigate(query ? `/quests?${query}` : '/quests')
  }

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <span className="hero-label">
              <Sparkles size={16} aria-hidden="true" />
              Small adventures across Georgia
            </span>
            <h1>Georgia still has places to surprise you.</h1>
            <p>
              Choose a region, pick a small challenge and turn an ordinary day
              into a local adventure.
            </p>
            <div className="hero-actions">
              <Button to="/quests">
                Explore quests <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to="/create-quest" variant="light">
                Add your idea
              </Button>
            </div>
          </div>

          <div className="hero-side">
            <div className="location-card">
              <span className="eyebrow">Choose a region</span>
              <h2>Where do you want to explore?</h2>
              <form className="location-picker" onSubmit={handleLocationSubmit}>
                <label>
                  <span>Region</span>
                  <select
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                  >
                    {getRegionNames().map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <Button className="button--full" type="submit">
                  Show regional quests
                </Button>
              </form>
              <p>
                {curatedQuestIds.length} ideas in different parts of Georgia
              </p>
            </div>
            <WeatherCard compact city={weatherCity} />
          </div>
        </div>
      </section>

      <PageSection
        eyebrow="Choose your mood"
        title="What kind of day is it?"
        text="Start with a category and find a challenge that fits your time."
      >
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              key={category.name}
              to={`/quests?category=${category.name}`}
            >
              <img src={category.image} alt="" />
              <span className="category-card__overlay" />
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection
        className="page-section--tinted"
        eyebrow="Start here"
        title="Popular this week"
        text="A few easy ideas when you do not know what to choose."
      >
        {loading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && <QuestGrid quests={featuredQuests} />}
        <div className="section-action">
          <Button to="/quests" variant="outline">
            See all quests
          </Button>
        </div>
      </PageSection>

      <PageSection
        eyebrow="How it works"
        title="Three simple steps"
        text="No complicated rules and no pressure to be perfect."
      >
        <div className="steps-grid">
          <article className="step-card">
            <span>01</span>
            <Search aria-hidden="true" />
            <h3>Find a quest</h3>
            <p>Search by category, difficulty or the time you have.</p>
          </article>
          <article className="step-card">
            <span>02</span>
            <UserRoundCheck aria-hidden="true" />
            <h3>Join the challenge</h3>
            <p>Log in with the demo account and add it to your list.</p>
          </article>
          <article className="step-card">
            <span>03</span>
            <CheckCircle2 aria-hidden="true" />
            <h3>Complete it</h3>
            <p>Track your progress and collect points as you explore.</p>
          </article>
        </div>
      </PageSection>

      <section className="home-cta">
        <div className="container home-cta__inner">
          <div>
            <span className="eyebrow">Your idea belongs here too</span>
            <h2>Know a good local challenge?</h2>
            <p>Add it to LocalQuest and help others explore more of Georgia.</p>
          </div>
          <Button to="/create-quest" variant="light">
            Create a quest <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  )
}

export default HomePage
