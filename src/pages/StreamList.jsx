import { useState } from 'react';

function StreamList() {
  const [item, setItem] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  const addItem = (event) => {
    event.preventDefault();
    const trimmed = item.trim();
    if (!trimmed) return;

    const newEntry = {
      id: Date.now(),
      name: trimmed,
      type: 'Movie/Show',
    };

    setWatchlist((current) => [newEntry, ...current]);
    setItem('');
    console.log('New StreamList item:', newEntry);
  };

  const removeItem = (id) => {
    setWatchlist((current) => current.filter((entry) => entry.id !== id));
  };

  return (
    <section className="panel">
      <div className="hero-card">
        <h2>Create your personal StreamList</h2>
        <p>Keep track of the movies and programs you want to watch later.</p>
      </div>

      <form className="input-form" onSubmit={addItem}>
        <label htmlFor="stream-input">Add a movie or show title</label>
        <div className="input-row">
          <input
            id="stream-input"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. The Matrix, Loki, Stranger Things"
          />
          <button type="submit">Add to list</button>
        </div>
      </form>

      <div className="watchlist-preview">
        <div className="list-header">
          <h3>My StreamList</h3>
          <span>{watchlist.length} item{watchlist.length === 1 ? '' : 's'}</span>
        </div>

        {watchlist.length === 0 ? (
          <p className="empty-state">Your StreamList is empty. Add a title to begin.</p>
        ) : (
          <ul>
            {watchlist.map((entry) => (
              <li key={entry.id} className="list-item">
                <div>
                  <strong>{entry.name}</strong>
                  <p>{entry.type}</p>
                </div>
                <button className="remove-button" type="button" onClick={() => removeItem(entry.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default StreamList;
