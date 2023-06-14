import React from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"
import { Button, Typography } from '@material-tailwind/react';

const Slider = () => {
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )

    return (
        <>
            <div ref={sliderRef} className="keen-slider">
                <div className="keen-slider__slide number-slide1">
                </div>
                <div className="keen-slider__slide number-slide2"></div>
                <div className="keen-slider__slide number-slide3"></div>
            </div>
        </>
    );
};

export default Slider;
