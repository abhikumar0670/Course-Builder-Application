import { useState, useMemo } from 'react';

import EmptyState from '../ui/EmptyState';
import Header from '../ui/Header';
import Outline from '../ui/Outline';

import LinkModal from './LinkModal';
import DraggableModule from './DraggableModule';
import ModuleModal from './ModuleModal';
import UploadModal from './UploadModal';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Current items for editing
  const [currentModule, setCurrentModule] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);

  const handleAddClick = type => {
    switch (type) {
      case 'module':
        setCurrentModule(null);
        setIsModuleModalOpen(true);
        break;
      case 'link':
        setCurrentModuleId(null); // null means no specific module
        setIsLinkModalOpen(true);
        break;
      case 'upload':
        setCurrentModuleId(null); // null means no specific module
        setIsUploadModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModuleModal = () => {
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleSaveModule = module => {
    if (currentModule) {
      // Edit existing module
      setModules(modules.map(m => (m.id === module.id ? module : m)));
    } else {
      // Add new module
      setModules([...modules, module]);
    }
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleEditModule = module => {
    setCurrentModule(module);
    setIsModuleModalOpen(true);
  };

  const handleDeleteModule = moduleId => {
    setModules(modules.filter(module => module.id !== moduleId));
    // Also remove any items associated with this module
    setItems(items.filter(item => item.moduleId !== moduleId));
  };

  const handleAddItem = (moduleId, type) => {
    setCurrentModuleId(moduleId);
    if (type === 'link') {
      setIsLinkModalOpen(true);
    } else if (type === 'file') {
      setIsUploadModalOpen(true);
    }
  };

  const handleSaveLink = linkItem => {
    setItems([...items, linkItem]);
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleSaveUpload = fileItem => {
    setItems([...items, fileItem]);
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleDeleteItem = itemId => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleRenameItem = (itemId, newTitle) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, title: newTitle } : item
    ));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter modules and items based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return { modules, items };
    }

    const searchLower = searchTerm.toLowerCase();
    const matchedModules = [];
    const matchedItems = [];

    // Find modules that match the search term
    modules.forEach(module => {
      if (module.name.toLowerCase().includes(searchLower)) {
        matchedModules.push(module);
        // Include all items from matched modules
        const moduleItems = items.filter(item => item.moduleId === module.id);
        matchedItems.push(...moduleItems);
      }
    });

    // Find items that match the search term
    items.forEach(item => {
      const matchesTitle = item.title.toLowerCase().includes(searchLower);
      const matchesUrl = item.url && item.url.toLowerCase().includes(searchLower);
      const matchesFilename = item.fileName && item.fileName.toLowerCase().includes(searchLower);
      
      if (matchesTitle || matchesUrl || matchesFilename) {
        // Add the item's parent module if not already included
        if (item.moduleId) {
          const parentModule = modules.find(m => m.id === item.moduleId);
          if (parentModule && !matchedModules.some(m => m.id === parentModule.id)) {
            matchedModules.push(parentModule);
          }
        }
        
        // Add the item if not already included
        if (!matchedItems.some(i => i.id === item.id)) {
          matchedItems.push(item);
        }
      }
    });

    return {
      modules: matchedModules,
      items: matchedItems
    };
  }, [modules, items, searchTerm]);

  // Items without modules (standalone resources)
  const standaloneItems = useMemo(() => {
    return filteredData.items.filter(item => !item.moduleId);
  }, [filteredData.items]);

  // Drag and drop handlers
  const handleMoveModule = (fromIndex, toIndex) => {
    const newModules = [...modules];
    const draggedModule = newModules[fromIndex];
    newModules.splice(fromIndex, 1);
    newModules.splice(toIndex, 0, draggedModule);
    setModules(newModules);
  };

  const handleMoveItem = (draggedItem, hoverIndex, targetModuleId) => {
    const newItems = [...items];
    const draggedItemIndex = newItems.findIndex(item => item.id === draggedItem.id);
    const item = newItems[draggedItemIndex];
    
    // Remove item from current position
    newItems.splice(draggedItemIndex, 1);
    
    // Update item's module ID
    const updatedItem = { ...item, moduleId: targetModuleId };
    
    if (hoverIndex === -1) {
      // Add to end of target module
      const targetModuleItems = newItems.filter(i => i.moduleId === targetModuleId);
      const insertIndex = newItems.length;
      newItems.splice(insertIndex, 0, updatedItem);
    } else {
      // Insert at specific position within target module
      const targetModuleItems = newItems.filter(i => i.moduleId === targetModuleId);
      const insertIndex = targetModuleItems.length > hoverIndex ? 
        newItems.findIndex(i => i.id === targetModuleItems[hoverIndex].id) :
        newItems.length;
      newItems.splice(insertIndex, 0, updatedItem);
    }
    
    setItems(newItems);
  };

  return (
    <div className="course-builder">
      <Header 
        onAddClick={handleAddClick} 
        onSearch={handleSearch} 
        searchTerm={searchTerm}
      />

      <div className="builder-layout">
        {modules.length > 0 && (
          <Outline 
            modules={filteredData.modules} 
            items={filteredData.items}
          />
        )}
        
        <div className="builder-content">
          {filteredData.modules.length === 0 && modules.length === 0 ? (
            <EmptyState />
          ) : filteredData.modules.length === 0 && searchTerm ? (
            <div className="no-results">
              <h3>No results found</h3>
              <p>Try searching with different keywords</p>
            </div>
          ) : (
            <div className="module-list">
              {/* Standalone items (resources without modules) */}
              {standaloneItems.length > 0 && (
                <div className="standalone-resources">
                  <h3 className="section-title">Resources</h3>
                  <div className="standalone-items">
                    {standaloneItems.map(item => (
                      <div key={item.id} className="standalone-item">
                        {item.type === 'link' ? (
                          <div className="module-item link-item">
                            <div className="item-content">
                              <div className="item-icon">
                                <span className="icon-link">🔗</span>
                              </div>
                              <div className="item-info">
                                <h4 className="item-title">{item.title}</h4>
                                <a
                                  href={item.url}
                                  className="item-url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.url}
                                </a>
                              </div>
                            </div>
                            <button className="item-delete" onClick={() => handleDeleteItem(item.id)}>
                              <span className="delete-icon">🗑️</span>
                            </button>
                          </div>
                        ) : (
                          <div className="module-item file-item">
                            <div className="item-content">
                              <div className="item-icon">
                                <span className="icon-file">📄</span>
                              </div>
                              <div className="item-info">
                                <h4 className="item-title">{item.title}</h4>
                                <p className="item-details">
                                  {item.fileName} ({Math.round(item.fileSize / 1024)} KB)
                                </p>
                              </div>
                            </div>
                            <button className="item-delete" onClick={() => handleDeleteItem(item.id)}>
                              <span className="delete-icon">🗑️</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Modules */}
              {filteredData.modules.map((module, index) => (
                <DraggableModule
                  key={module.id}
                  module={module}
                  index={index}
                  items={filteredData.items}
                  onEdit={handleEditModule}
                  onDelete={handleDeleteModule}
                  onAddItem={handleAddItem}
                  onDeleteItem={handleDeleteItem}
                  onRenameItem={handleRenameItem}
                  onMoveModule={handleMoveModule}
                  onMoveItem={handleMoveItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Module Modal */}
      <ModuleModal
        isOpen={isModuleModalOpen}
        onClose={handleCloseModuleModal}
        onSave={handleSaveModule}
        module={currentModule}
      />

      {/* Link Modal */}
      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={handleCloseLinkModal}
        onSave={handleSaveLink}
        moduleId={currentModuleId}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSave={handleSaveUpload}
        moduleId={currentModuleId}
      />
    </div>
  );
};

export default CourseBuilder;
