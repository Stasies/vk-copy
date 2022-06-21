import React from 'react'

const searrch = () => {
  return (
    // <div className="searchContainer">
    //   <Share />
    //   <div className="searchInputWrapper">
    //     <SearchIcon className="searchInputIcon" />
    //     <input
    //       ref={searchInput}
    //       type="text"
    //       placeholder="Search"
    //       onKeyPress={(e) => findPosts(e)}
    //     />
    //   </div>
    //   {searchInput.current.value.length < 1 && <NoPosts value={"No results"} />}
    //   {searchInput && (
    //     <>
    //       {filteredPosts.map((post) => (
    //         <Post key={post._id} post={post} />
    //       ))}
    //     </>
    //   )}
    // </div>
                {users.length > 0 && (
              <div className="friendsPeople">
                {users?.map((user) => (
                  <div className="singleFriend">
                    <Link to={`/profile/${user.username}`}>
                      <div className="singleFriendImg"></div>
                    </Link>
                    <Link to={`/profile/${user.username}`}>
                      <div className="singleFriendAbout">
                        <b>{user.username}</b>
                        {/* <p className="singleFriendInfoText">
                      УрФУ им. первого Президента России Б. Н. Ельцина
                    </p> */}
                        <p className="writeMessage">Write message</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
  );
}

export default searrch