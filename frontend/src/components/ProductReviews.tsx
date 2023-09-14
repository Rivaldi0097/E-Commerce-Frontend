"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/productReviews.css";
import ProductStarReview from './ProductStarReview';
import { ReviewModel } from '../models/reviewModel';

function ProductReviews() {

    const reviewsPerPage = 5;
    const [reviews, setReviews] = useState<ReviewModel[] | undefined>([]);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [displayReviews, setDisplayReviews] = useState<any>();

    useEffect(()=>{
        axios.get(`http://3.27.117.173:5001/api/reviews/64dccb9d3ff94327259d9ae6`)
        .then((res) => {
            
            if(res.data.length != 0){
                console.log(res)

                //to give the data page id
                let data = res.data;
                let pageCount = reviewsPerPage;
                let currentPageValue = 1;

                for(let i=0; i<data.length; i++){
                    if(pageCount > 0){
                        data[i]['pageValue'] = currentPageValue
                        pageCount -= 1
                    }else{
                        data[i]['pageValue'] = currentPageValue + 1
                        pageCount = reviewsPerPage - 1;
                        currentPageValue += 1
                    }
                }

                setReviews(data)

                //to get the numbers of page needed
                let numbers = []
                for(let i=0; i<(Math.ceil(res.data.length/reviewsPerPage)); i++){
                    numbers.push(i + 1)
                }
                
                setPageNumbers(numbers)

            }else{
                setPageNumbers([0])
            }

        }).catch((err) => {
            console.log(err)
        })
    }, [])
    
    useEffect(() => {
        console.log(reviews)
        let displayData = reviews?.filter((obj: any) => obj.pageValue === currentPageNumber);

        setDisplayReviews(
            displayData?.map((obj:any) => {
                return(
                    <div className='ReviewBox' key={obj._id}>
                        <div>
                            <p>Username: <span className='Username'>{obj.username}</span></p>
                            <ProductStarReview 
                                numberOfStars={obj.rating}
                            />
                        </div>

                        <p>Comment:</p>
                        <p>{obj.description}</p>
                    </div>
                )
            })
        )

    }, [currentPageNumber, reviews])
    
    return (
        <div className='ReviewsFlexBox'>
            
            {/* this is for the review */}
            {displayReviews}

            {/* this is for the page number selection */}
            <div className='PageNumberFlexBox'>
                <button 
                    className='PageControlButton'
                    onClick={() => {
                        currentPageNumber - 1 >= 1?
                            setCurrentPageNumber(currentPageNumber - 1)
                        :
                            setCurrentPageNumber(currentPageNumber)
                    }}
                >
                        Previous
                </button>

                {pageNumbers.map((pageNumber: number, i) => {
                    return(
                        <span 
                            key={i}
                            className={pageNumber === currentPageNumber? 'PageNumberUndeline' : 'PageNumnber'}
                        >
                            {pageNumber}
                        </span>
                    )
                })}

                <button 
                    className='PageControlButton'
                    onClick={() => {
                        currentPageNumber + 1 <= pageNumbers[pageNumbers.length - 1]?
                            setCurrentPageNumber(currentPageNumber + 1)
                        :
                            setCurrentPageNumber(currentPageNumber)
                    }}
                >
                    Next
                </button>
            </div>
            


        </div>
    );
}

export default ProductReviews;