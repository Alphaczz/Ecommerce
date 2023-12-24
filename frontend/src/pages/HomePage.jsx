import { Flex,Button, ButtonSpinner, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { useState } from 'react';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postAtom from '../atoms/postAtom';

const HomePage = () => {
  const [posts , setPosts] = useRecoilState(postAtom);
  const [loading, setLoading] = useState(true);
  const showToast=useShowToast();
  useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);
  return (
    <>
        {!loading && posts.length===0  && <h1 justifyContent={'center'} >Follow Some User to see the feed</h1>}

       {loading && (
        <Flex justifyContent="center" >
          <Spinner size="xl" />
        </Flex>
       )}
    {posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
    </>
  )
}

export default HomePage;