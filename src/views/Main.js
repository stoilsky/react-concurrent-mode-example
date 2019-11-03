import React from 'react';
import { getPosts, getFilters } from '../server/DataManager';
import './Main.css';

const Main = props => {
  const [posts, setPosts] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState('');
  const [filtersList, setFiltersList] = React.useState([]);

  React.useEffect(() => {
    getPosts().then(res => {
      setPosts(res);
    })
    getFilters().then(res => {
      setFiltersList(res);
    })
  }, []);

  const onFilter = React.useCallback(e => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);
    getPosts(`userId=${newFilter}`).then(res => {
      setPosts(res);
    })
  }, [])

  return (
    <div className="App">
      <div className={'Filters'}>
        User filter{' '}
        <select onChange={onFilter} value={selectedFilter}>
          <option value="" disabled key={0}>select user</option>
          {
            filtersList.map(f => <option value={f} key={f}>{f}</option>)
          }
        </select>
      </div>

      Posts:
      <div className={`Container`}>
        {
          posts.map(post => <div key={post.id} className={`Post`}>
            <strong>By user: </strong>{post.userId}
            <br/>
            <br/>
            {post.title}
          </div>)
        }
      </div>
    </div>
  );
}

export default Main;
