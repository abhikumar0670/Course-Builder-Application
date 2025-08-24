const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        <div className="empty-box">
          <div className="notebook">
            <div className="notebook-rings"></div>
            <div className="notebook-lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="notebook-bookmark"></div>
          </div>
          <div className="pencil">
            <div className="pencil-body"></div>
            <div className="pencil-tip"></div>
            <div className="pencil-eraser"></div>
          </div>
        </div>
      </div>
      <h2 className="empty-state-title">Nothing added here yet</h2>
      <p className="empty-state-description">
        Click on the [+] Add button to add items to this course
      </p>
    </div>
  );
};

export default EmptyState;
