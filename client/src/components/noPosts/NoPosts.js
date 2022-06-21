import "./noPosts.css";

const NoPosts = ({ value }) => {
  return (
    <div className="post">
      <div className="noPostWrapper">
        {value ? <h2>{value}</h2> : <h2>No posts yet</h2>}
      </div>
    </div>
  );
};

export default NoPosts;
