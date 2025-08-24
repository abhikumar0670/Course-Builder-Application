import { useEffect, useState } from 'react';

const Outline = ({ modules, items = [] }) => {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [expandedModuleId, setExpandedModuleId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const moduleElements = modules.map(module => 
        document.getElementById(`module-${module.id}`)
      ).filter(Boolean);

      if (moduleElements.length === 0) return;

      // Find the module that's currently in view
      let currentModule = null;
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollTop + windowHeight / 2;

      for (const element of moduleElements) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + rect.height;

        if (elementTop <= viewportCenter && elementBottom >= viewportCenter) {
          currentModule = element.id.replace('module-', '');
          break;
        }
      }

      // If no module is in the center, find the closest one
      if (!currentModule) {
        let closestModule = null;
        let minDistance = Infinity;

        for (const element of moduleElements) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + scrollTop + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestModule = element.id.replace('module-', '');
          }
        }
        currentModule = closestModule;
      }

      if (currentModule !== activeModuleId) {
        setActiveModuleId(currentModule);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [modules, activeModuleId]);

  const handleModuleClick = (moduleId) => {
    // Toggle expanded state
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
    
    // Scroll to the module
    const element = document.getElementById(`module-${moduleId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (modules.length === 0) {
    return (
      <div className="outline">
        <div className="outline-header">
          <h2 className="course-title">Course Outline</h2>
        </div>
        <div className="empty-outline">No modules added yet</div>
      </div>
    );
  }

  return (
    <div className="outline">
      <div className="outline-header">
        <h2 className="course-title">Course Outline</h2>
      </div>
      <div className="outline-content">
        {modules.map(module => (
          <div key={module.id} className="outline-module">
            <div className="module-container">
              <div className="module-line"></div>
              <div className="module-content-wrapper">
                <h3 
                  className={`module-title ${activeModuleId === module.id ? 'active' : ''}`}
                  onClick={() => handleModuleClick(module.id)}
                >
                  {module.name}
                  <span className="item-count">
                    ({items.filter(item => item.moduleId === module.id).length} items)
                  </span>
                </h3>
                {expandedModuleId === module.id && (
                  <div className="module-items">
                    {items.filter(item => item.moduleId === module.id).length > 0 ? (
                      <ul className="item-list">
                        {items
                          .filter(item => item.moduleId === module.id)
                          .map((item, index) => (
                            <li key={item.id || index} className="module-item">
                              <div className="item-line"></div>
                              <div className="item-content">
                                <span className="item-icon">
                                  {item.type === 'file' ? '📄' : '🔗'}
                                </span>
                                {item.title || item.fileName || 'Untitled'}
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className="no-items">
                        <div className="item-line"></div>
                        <div>No items added to this module</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outline;
