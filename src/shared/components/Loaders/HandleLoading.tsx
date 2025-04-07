import './HandleLoading.css';

export default function HandleLoading() {
  return (
    <div className="loading-overlay" aria-label="Cargando..." role="status">
      <h1 className="loading-text-anx">Anx</h1>
      <p style={{ textAlign: 'center', color: 'gray', fontSize: '.9rem' }}>Content is loading. <br />Wait a moment...</p>
    </div>
  )
}