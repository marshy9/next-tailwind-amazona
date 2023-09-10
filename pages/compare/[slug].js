import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Paddle from '../../models/Paddle';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import TabsBar from '../../components/TabsBar';
import SwiperItem from '../../components/SwiperItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// Import radar charts
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function PaddleScreen({ paddle }) {
  const { state, dispatch } = useContext(Store);
  const cartPaddles = state.cart.cartItems.slice(); // get full cart array

  const data = {
    labels: ['Price', 'RPM', 'Swing Weight'],

    datasets: cartPaddles.map((paddle) => ({
      label: paddle.name,
      data: [paddle.price, paddle.rpm, paddle.swingWeight],
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // color
    })),
  };

  const items = [
    {
      title: 'Radar Chart',
      content: <Radar data={data} />,
    },
    {
      title: 'Tab 2',
      content: (
        <div className="border-2 border-blue-400 rounded-lg p-4">
          <h1 className="text-3xl text-blue-600">Title Test 2</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            aperiam asperiores dolo iti harum! Totam, mollitia quos voluptatem
            deleniti provident obcaecati rerum.
          </p>
        </div>
      ),
    },
  ];

  // Add fixed width and height classes
  const boxStyles = 'w-64 h-64 ';
  const paddleWidth = 'w-1/3';

  return (
    <Layout>
      <Swiper
        autoHeight={false}
        slidesPerView={3.5}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {cartPaddles.map((paddle) => (
          <SwiperSlide key={paddle.id}>
            <SwiperItem paddle={paddle} key={paddle.slug}></SwiperItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <TabsBar items={items} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const paddle = await Paddle.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      paddle: paddle ? db.convertDocToObj(paddle) : null,
    },
  };
}
