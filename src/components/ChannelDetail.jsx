import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import {Videos, ChannelCard} from './';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const {id} = useParams();

  console.log(channelDetail);

  useEffect(()=> {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'radial-gradient(circle, rgba(213,107,15,1) 13%, rgba(9,137,13,1) 57%, rgba(233,216,22,1) 97%)',
          zIndex: 10,
          height: '300px'
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop = '-110px'/>
      </Box>

      <Box display="flex" p={2}>
        <Box sx={{mr: {sm: '100px'}}}/>
          <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail