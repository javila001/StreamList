import { useState } from 'react';

function StreamList() {
  const [item, setItem] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addItem = (event) => {
    event.preventDefault();
    const trimmed = item.trim();
    if (!trimmed) return;

    const newEntry = {
      id: Date.now(),
      name: trimmed,
      completed: false,
      addedAt: new Date().toLocaleDateString(),
    };

    setWatchlist((current) => [newEntry, ...current]);
    setItem('');
    console.log('New StreamList item:', newEntry);
  };

  const removeItem = (id) => {
    setWatchlist((current) => current.filter((entry) => entry.id !== id));
  };

  const toggleComplete = (id) => {
    setWatchlist((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, completed: !entry.completed } : entry))
    );
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditingText(entry.name);
  };

  const saveEdit = (id) => {
    const trimmed = editingText.trim();
    if (!trimmed) {
      removeItem(id);
      setEditingId(null);
      setEditingText('');
      return;
    }

    setWatchlist((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, name: trimmed } : entry))
    );
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const clearCompleted = () => {
    setWatchlist((current) => current.filter((entry) => !entry.completed));
  };

  const visibleItems = watchlist.filter((entry) => {
    if (filter === 'completed') return entry.completed;
    if (filter === 'active') return !entry.completed;
    return true;
  });

  const activeCount = watchlist.filter((entry) => !entry.completed).length;
  const completedCount = watchlist.filter((entry) => entry.completed).length;

  return (
    <section className="panel">
      <div className="hero-card">
        <h2>Create your personal StreamList</h2>
        <p>Organize your next binge session, keep favorite movies in view, and update your list with ease.</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <strong>{watchlist.length}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active</span>
          <strong>{activeCount}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Finished</span>
          <strong>{completedCount}</strong>
        </div>
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
          <button type="button" className="ghost-button" onClick={clearCompleted} disabled={completedCount === 0}>
            Clear completed
          </button>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter watchlist">
          <button type="button" className={filter === 'all' ? 'filter-button active' : 'filter-button'} onClick={() => setFilter('all')}>
            All
          </button>
          <button type="button" className={filter === 'active' ? 'filter-button active' : 'filter-button'} onClick={() => setFilter('active')}>
            Active
          </button>
          <button type="button" className={filter === 'completed' ? 'filter-button active' : 'filter-button'} onClick={() => setFilter('completed')}>
            Completed
          </button>
        </div>

        {watchlist.length === 0 ? (
          <p className="empty-state">Your StreamList is empty. Add a title to begin.</p>
        ) : (
          <ul>
            {visibleItems.map((entry) => (
              <li key={entry.id} className={`list-item ${entry.completed ? 'completed' : ''}`}>
                <div className="list-main">
                  <button className="check-button" type="button" onClick={() => toggleComplete(entry.id)}>
                    {entry.completed ? '✓' : '○'}
                  </button>

                  {editingId === entry.id ? (
                    <div className="edit-controls">
                      <input
                        className="edit-input"
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        autoFocus
                      />
                      <div className="action-row">
                        <button className="save-button" type="button" onClick={() => saveEdit(entry.id)}>
                          Save
                        </button>
                        <button className="ghost-button" type="button" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="item-content">
                      <strong>{entry.name}</strong>
                      <p>{entry.completed ? 'Completed and ready to watch' : 'Still on your list'} • Added {entry.addedAt}</p>
                    </div>
                  )}
                </div>

                {editingId !== entry.id && (
                  <div className="item-actions">
                    <button className="ghost-button" type="button" onClick={() => startEdit(entry)}>
                      Edit
                    </button>
                    <button className="remove-button" type="button" onClick={() => removeItem(entry.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default StreamList;
