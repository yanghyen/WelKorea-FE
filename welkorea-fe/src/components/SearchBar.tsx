import React, { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    console.log('검색어:', query)
    // TODO: API 연동
  }

  return (
    <div style={{ padding: '10px', background: '#fff', zIndex: 100 }}>
      <input
        type="text"
        placeholder="Search places"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '80%' }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
