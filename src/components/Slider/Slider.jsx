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
                    <Typography variant="h2" color="gray" className="text-center mb-10">
                        Popular Classes
                    </Typography>
                    <Button color="lightBlue" ripple="light">
                        Get Started
                    </Button>
                </div>
                <div className="keen-slider__slide number-slide2">2</div>
                <div className="keen-slider__slide number-slide3">3</div>
            </div>
        </>
    );
};

export default Slider;
