import { useState } from 'react';
import { jsPDF } from 'jspdf';

const EmptyModuleState = () => {
  return (
    <div className="empty-module-state">
      <div className="empty-illustration">
        <div className="paper-background">
          <div className="lined-paper">
            <div className="paper-content">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="pencil">
              <div className="pencil-body"></div>
              <div className="pencil-tip"></div>
              <div className="pencil-eraser"></div>
            </div>
          </div>
        </div>
      </div>
      <p className="empty-text">No content added to this module yet.</p>
      <button className="add-item-button">+ Add item</button>
    </div>
  );
};

const ModuleItem = ({ item, onDelete, onRename }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const handleDelete = e => {
    e.stopPropagation();
    onDelete(item.id);
  };

  const toggleOptions = e => {
    e.stopPropagation();
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleRename = () => {
    setIsEditing(true);
    setIsOptionsOpen(false);
  };

  const handleSaveRename = () => {
    if (editTitle.trim() && onRename) {
      onRename(item.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelRename = () => {
    setEditTitle(item.title);
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (item.type === 'file') {
      try {
        if (!item.fileData) {
          throw new Error('No file data available for download');
        }

        // Create a blob from the file data
        const blob = new Blob([item.fileData], { type: item.fileType || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = item.fileName || 'download';
        
        // Add to document, trigger click, and clean up
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert(`Error downloading file: ${error.message}`);
      }
    } else if (item.type === 'link') {
      // For links, open in new tab
      window.open(item.url, '_blank');
    }
    setIsOptionsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      handleCancelRename();
    }
  };

  if (item.type === 'link') {
    return (
      <div className="module-item link-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-link">🔗</span>
          </div>
          <div className="item-info">
            {isEditing ? (
              <div className="edit-item-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={handleSaveRename}
                  className="edit-item-input"
                  autoFocus
                />
                <div className="edit-item-buttons">
                  <button className="edit-btn-save" onClick={handleSaveRename}>
                    ✓
                  </button>
                  <button className="edit-btn-cancel" onClick={handleCancelRename}>
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="item-title">{item.title}</h4>
                <a
                  href={item.url}
                  className="item-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </>
            )}
          </div>
        </div>
        <div className="item-actions">
          <button className="btn-options" onClick={toggleOptions}>
            <span className="options-icon">⋮</span>
          </button>
          {isOptionsOpen && (
            <div className="options-menu">
              <button className="option-item" onClick={handleRename}>
                <span className="option-icon">✏️</span>
                Rename
              </button>
              <button className="option-item" onClick={handleDownload}>
                <span className="option-icon">↗️</span>
                Open link
              </button>
              <button className="option-item delete" onClick={handleDelete}>
                <span className="option-icon">🗑️</span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (item.type === 'file') {
    return (
      <div className="module-item file-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-file">📄</span>
          </div>
          <div className="item-info">
            {isEditing ? (
              <div className="edit-item-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={handleSaveRename}
                  className="edit-item-input"
                  autoFocus
                />
                <div className="edit-item-buttons">
                  <button className="edit-btn-save" onClick={handleSaveRename}>
                    ✓
                  </button>
                  <button className="edit-btn-cancel" onClick={handleCancelRename}>
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="item-title">{item.title}</h4>
                <p className="item-details">
                  {item.fileName} ({Math.round(item.fileSize / 1024)} KB)
                </p>
              </>
            )}
          </div>
        </div>
        <div className="item-actions">
          <button className="btn-options" onClick={toggleOptions}>
            <span className="options-icon">⋮</span>
          </button>
          {isOptionsOpen && (
            <div className="options-menu">
              <button className="option-item" onClick={handleRename}>
                <span className="option-icon">✏️</span>
                Rename
              </button>
              <button className="option-item" onClick={handleDownload}>
                <span className="option-icon">⬇️</span>
                Download
              </button>
              <button className="option-item delete" onClick={handleDelete}>
                <span className="option-icon">🗑️</span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

    // If the module has no content (no files or links), show empty state
  if (!item.content || item.content.length === 0) {
    return (
      <div className="module-item">
        <div className="module-header">
          <div className="module-title-area">
            {isEditing ? (
              <div className="edit-module-name">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="edit-item-input"
                  autoFocus
                />
                <div className="edit-item-buttons">
                  <button className="edit-btn-save" onClick={handleSaveRename}>✓</button>
                  <button className="edit-btn-cancel" onClick={handleCancelRename}>✕</button>
                </div>
              </div>
            ) : (
              <h3 className="module-title">{item.title}</h3>
            )}
          </div>
          <div className="module-actions">
            <button className="btn-options" onClick={toggleOptions}>
              <span className="options-icon">⋮</span>
            </button>
            {isOptionsOpen && (
              <div className="options-menu">
                <button className="option-item" onClick={handleRename}>
                  <span className="option-icon">✏️</span>
                  Rename
                </button>
                <button className="option-item delete" onClick={handleDelete}>
                  <span className="option-icon">🗑️</span>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <EmptyState />
      </div>
    );
  }

  return null; // Fallback for unknown item types
};

export default ModuleItem;
