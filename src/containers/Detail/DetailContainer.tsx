import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@api/axiosInstance";
import { BookDetail } from "@components";

type ReviewParam = {
  reviewRating: number;
  isbn: string;
  bookInfo: {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishedDate: string;
    image: string;
    description: string;
  };
};

const DetailContainer = () => {
  const { state } = useLocation();
  const isbn = state.isbn;
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const handleChange = (i: number) => {
    if (i === rating) {
      setRating(0);
    } else {
      setRating(i);
    }
  }
  const handleClick = () => {
    mutate({
      reviewRating: rating,
      isbn: state.isbn,
      bookInfo: {
        title: state.title,
        author: state.author,
        isbn,
        publisher: state.publisher,
        publishedDate: state.publishedDate,
        image: state.image,
        description: state.description
      }
    })
  };

  const createMyReview = async (param: ReviewParam): Promise<any> => {
    const res = await axiosInstance.post('/review/', param);
    return res.data;
  };

  const { mutate } = useMutation<any, Error, ReviewParam>({
    mutationFn: createMyReview,
    onSuccess: async () => {
      alert("리뷰가 저장되었습니다!");
      navigate('/');
    },
  });

  // 상세페이지 책 정보 조회
  const getBookInfo = async (param: any) => {
    const response = await axiosInstance.get('/book/info', { params: param });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['bookinfo', isbn],
    queryFn: () => getBookInfo({ isbn }),
    enabled: !state.isSearch,
  });

  return (
    <>
      <BookDetail data={state.isSearch ? state : data} rating={rating} handleChange={handleChange} handleClick={handleClick} />
    </>
  )
}

export default DetailContainer;