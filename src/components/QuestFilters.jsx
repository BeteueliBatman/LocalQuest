import { Search } from 'lucide-react'

const QuestFilters = ({
  search,
  category,
  difficulty,
  region,
  categories,
  regions,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onRegionChange,
}) => (
  <div className="quest-filters">
    <label className="search-field">
      <span className="sr-only">Search quests</span>
      <Search size={19} aria-hidden="true" />
      <input
        type="search"
        value={search}
        placeholder="Search a quest..."
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>

    <label className="select-field">
      <span>Region</span>
      <select
        value={region}
        onChange={(event) => onRegionChange(event.target.value)}
      >
        {regions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>

    <label className="select-field">
      <span>Category</span>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>

    <label className="select-field">
      <span>Difficulty</span>
      <select
        value={difficulty}
        onChange={(event) => onDifficultyChange(event.target.value)}
      >
        {['All', 'Easy', 'Medium', 'Hard'].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  </div>
)

export default QuestFilters
