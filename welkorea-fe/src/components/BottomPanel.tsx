import React from 'react'

export default function BottomPanel() {
  return (
    <div
      style={{
        height: '200px',
        background: '#f5f5f5',
        borderTop: '1px solid #ccc',
        overflowY: 'auto',
        padding: '10px'
      }}
    >
      <p>🔽 검색 결과</p>
      {/* 결과 리스트는 추후 map 돌려서 렌더링 */}
    </div>
  )
}
