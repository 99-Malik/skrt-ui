"use client";

import React from "react";

interface BlockUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function BlockUserModal({ isOpen, onClose, onConfirm }: BlockUserModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/50 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full px-6 pb-6 pt-16 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="72" height="72" rx="36" fill="#FCE8E8" />
                            <rect x="20" y="20" width="32" height="32" fill="url(#pattern0_1632_28248)" />
                            <defs>
                                <pattern id="pattern0_1632_28248" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_1632_28248" transform="scale(0.015625)" />
                                </pattern>
                                <image id="image0_1632_28248" width="64" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>

                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-[#1F2937] text-center mb-2">Block User?</h2>

                    {/* Message */}
                    <p className="text-sm text-[#6B7280] text-center mb-6">
                        Are you sure, you want to block this user, it will restrict user activity from this app
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-3">
                        {/* Cancel Button */}
                        <button
                            onClick={onClose}
                            className=" flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#6B7280] text-sm font-normal hover:bg-gray-50 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2082_1308)">
                                    <path d="M10.9425 9.99999L17.8045 3.13799C17.926 3.01225 17.9932 2.84385 17.9916 2.66905C17.9901 2.49425 17.92 2.32705 17.7964 2.20344C17.6728 2.07984 17.5056 2.00972 17.3308 2.0082C17.156 2.00668 16.9876 2.07388 16.8619 2.19532L9.99986 9.05732L3.13786 2.19532C3.01212 2.07388 2.84372 2.00668 2.66892 2.0082C2.49413 2.00972 2.32692 2.07984 2.20331 2.20344C2.07971 2.32705 2.00959 2.49425 2.00807 2.66905C2.00656 2.84385 2.07375 3.01225 2.19519 3.13799L9.05719 9.99999L2.19519 16.862C2.07021 16.987 2 17.1565 2 17.3333C2 17.5101 2.07021 17.6796 2.19519 17.8047V17.8047C2.32021 17.9296 2.48975 17.9998 2.66652 17.9998C2.8433 17.9998 3.01284 17.9296 3.13786 17.8047L9.99986 10.9427L16.8619 17.8047C16.9869 17.9296 17.1564 17.9998 17.3332 17.9998C17.51 17.9998 17.6795 17.9296 17.8045 17.8047C17.9295 17.6796 17.9997 17.5101 17.9997 17.3333C17.9997 17.1565 17.9295 16.987 17.8045 16.862L10.9425 9.99999Z" fill="#727A90" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2082_1308">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Cancel
                        </button>

                        {/* Yes, Block Button */}
                        <button
                            onClick={onConfirm}
                            className=" flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#E51B1B] text-white text-sm font-normal hover:bg-[#E62E32] transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="20" height="20" fill="url(#pattern0_1632_28256)" />
                                <defs>
                                    <pattern id="pattern0_1632_28256" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_1632_28256" transform="scale(0.015625)" />
                                    </pattern>
                                    <image id="image0_1632_28256" width="64" height="64" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAQAElEQVR4AbybCZAcVRnHX/dce2Q3gkDiJgaVUkC0rEK8FY+SCEJiiVqi0VKOZD1IeaAiJEC8whEriHdRSUAFsQBTXMWRBFFRKUEQy1KOcJgEQsKVZLPZnau7/f37mO3u6ZnsJjNsvW/ee9/3ve963zu6Z9Y2XfjzPM/ynntuwNuzZ8gbG3uHV6st9SqVm71yZYs3Oup4u3d73siI5+3aFYDawu0Zc7zx8jb4bwTO9sbH3+fLePbZaV0w0xfZ0QDgeBEHZ5pqdb4ZGLjIuO6tplZba8bGvmnK5bmmUh4yjmODN8bzfAP8D7Vd15h6zTbVygz4jwfORc518K4zA9Mv88rleZKNjrw/pkMfHQkARpWY4SNxcimO/YH6d6ZS+RLGvwk7ZwKDQBGYrD7xasxByDjKVMunIe/3yP4TQTkPXW9EZw/y9rtM1qBMRRhRxJgjcHgZBt6GcUsw+EiYZRxTauIAekolPlbtArJfh67z0bUeWIHuN2BDfkpSU8x2qj/pLuv4YBz+KobcSv1tZudQBkuejBWoHQfIUyrxsWpLpsCgawZ6z0Svgn4WthwyJckxZgmOdffeJOIFbWzGtq9iNpZjzKvDUYFxxkimIEQ3VeJrB00DQoRkCtQNxrvubGy4yFjWTdj0LmybcjZEAiV0r6CdncgPm3r9WmAuA3KAjKHyHVedBtEjEE0624F4In7V6qchGi+6y8b6Nuy5AdsWe1M8MSQoLTyzz7F1EDv7MiJ+CbM+GyYpp9qr49IRQZUBu4Dnge3AVmQ9Tb0NeBHYA6hE/KqlRyB8GkQXOMg5iABcbAYHl3G8HphmbNXX4Fa0Bl7Hj8kVfoiCr5JuvRBkUKuxosHiB0Y8I4zZaEql60xPz3mmUDgdOAnce6nfDrwV2nuoT4J+GnA+7VugP4EQBUQyBHT9TVV1GqJMLGDjWaZY/LFvc5orox8JziAFKF+QZf/Y1KufCzC+EVnj4o67OLAJxy4HPsN+cazZufNUDPuR6e1da/X1/d0aHHyEeovV37/V6ul5jPY90K8DLjajo59izDsZ+wmTL15Be3OoW3pd2gKqRJmgVasLGHO5LlEJjoyOBmWgA5SfSpb1A1OvfQJMpLTVmABvWU/gxHKMPx74GnCLNW3aNmvmzD2WZVWB2A0IqbEiGlC1DjlklDHbGXu72bXjTDJiLplxDk5thF16BJE9oBpFeHUcLmDz4F/h+yBMC4gGNJG9bdv6ceQsNhfNfKSsJT8CXsTglcCJGPt9q1R6GGfGgJYOM6Zt0VhraGiMDHkEW1YSiHnAZQwaAWRLZBfdRhHeoudyTH4ae5ZwOvTRzyxibiIwIG9e9rJTEfAViFpfVP6aVp0FLqn9WzbIyPFKFtP+4AhG1Q9Eb+85OPVxZvch5Mn+VkGAzHKtVBazL5yBT5EfwjdAAhqdRmN8/BicP5t+PyAF2XwQKQGduzozfwyKFH3Q3SkEYpwAbGCP+STZcBNaZJtsoJkowgtRwJdzzfj4W9VJQ8TUwPvHnesu51iZDVKCm3jAx4voLvyHouhKoj33JQiCxx7xb87/hQThp6ExsjVsNqrIthlgfuDt3HkAdaKIoYHA8DxrbQGCjwUpgQk6uFZFfArCEEFYTRCOQ5bVirlTeGtg4Fn2qGXYvAqZgQ00UiXA12rvJ0NPx67EUhBxgn+0eji755dBJJjop4uCk8ZJloIwiyCsIQgfQln3gzA4+AITdgGZcAMGBTbQyCy12mLsiq7uPosG+A2M7TEF73M8cR0GQg42aPTjpUZHNPHQTJQA73kKgjLhpQkCx6zJ5Za02RgDu1x3Dkv18/jaeGYQIfCgUtEa/jidCRydsETObieNLmYDegy8+CI83UYRXldTLYcriHjX9wRfc7H4MEthCe1RQDZk2cZLl/pnselV8PhFjATFU8rPo6GNTwQfr0YMXHbfqznqLkXRFwnCU9DE51Cni+QpCHo79JIsB04H1+zYsQ4br0wbE/Zlq0uGz8H2T0dZIKQxIyPTWfsLYCwA6cipb5Ne/4VnjTV9+osouYsgLETQJvhzgHioEiXAe54yYTVR7/py0G0Tm34BRJOTZZdhjzqF67b/wBQEoFR6C5F5bcL8iY54qmwyq8y0aRuFJtoOQVhPEBahbBM48WRlgvAumfWSBQGbHsdWZYEb2kWVKq57GDxvFtYmFXpx/kQ6uvRQJW58EmKY/f9BuBXHq9R+oe0QhDtROAx9M8hgxmmkSjoIXT0isavCpFyFTcoCmeLqI4TAFmP0zlF7U69NKgwQgOiWFGcOx1Dl83ebnTu30koUlDkEYQPRHEbpZDNhDctByq2EsE52SqXNJp+/FZEuIKepUqVWO1a+2xwfhxGAWSmyutHgEZy71l9fwqYgDIKWQxSEHCztlsMs1qCC0M09oYzNt2DHOKAiX1RPgOsO4furbSJ1DGs0Sn/T9GfZWzD4gSZ8DBEGYQPLYRGptxlSuyDodBhCZteOSOzxuCHejy0vYEur0kfmvk/p8RYC0BNyqR82wyqf+4/ZtUtvZkJEdoVSJ1wOOh20/loFIcB73kyCsIbl0J1MGB3dzQxnTVzko3x+m8018ljSpZThlhgdhNxvZs/W7S+DJYkiCC5BuJNMWEj0N0MNnKWRKsK7BF6ZsLorQZgxo4btCoCDbvlClShF47hvto3r6fKTZnBD1nFTN4/SlhCqvReC4BCE9aTXQgK7iRFyNmu8dHYzCHXjuk8S5Co2qLj6SEC9NocAODIwgY91qsZytuHUlN7qwO8QBGXC8F4yIR2Ejh2R2KDgbmQSqjF/kk3P48znI4lN9KpsJjsSmEl2MMAhCBvIhKkEYQ3LoXNHpG0/j7n7EQDPczgl9roBoiSzxIKwiJmYzHKY1dGNsV7fg2Gt9y8mXykIT/cKQaj7mVAsDhOEdqeDbImOyNUdzYQ27tkY1ZpsWXnWsL4Iac0zCQpB0HLQZekM9LULgvajKAj7vxzyed1vCi1NtCz2AD5M678Cx6S+p2/NMUmKZVlumAmLYkFwM4YrCNrAhsLlsO97guvqXWDWER+otSw/AFlGmPCvhLGv4YGpI/d2y7IcgrCOe4IyYRM6bMAB0iXAB4/SyoQpX5Z8m3O52RyDrTPAzhGAfEHfwbkpC+yw38tl4gjamhWq/S9hEHRtHmZ5bUaiZGcFQfgoE1axJ0z1iJTjRzCBJXSoRD6pHUDOHrVNzv4nvTqQLgqKbopHm2ee0eNjmr7P/UYQCoVFewmCjFYQZk15OWzfruWrZ/5ARrO1NZPL3SeirovlkC6nw2ZY1etv4ivngbDXsSoWhGFmScshh/CsTJCN8SBMbjn09/exf70emekS+agnxTsl/G44xoDs4rozuQscnU3cP2wYBJ0OiwhCu9NBdkanw+SeIguFo7kKv6KNhaNc8/9ss7YeJw31A4U0r5S6GNbLRvIRNpWeNEMn+mEQtCdoY4yC4GbIDjJkEk+R2Cqb9YZbx6BkyZekSMt6xjiVjbbp7x/huqosSDLEe/X6CQTqlXFUJ9sEweV0UCYsZDK0McpgGZ5WoyBoOQyxJ6zGpuwjslyeyRX+A+nBiX6h8A983y1FWgvrIWofUD+uOOgHXyg0XiXD2/HSCEKhED1FSreToSjATxyRiSAw+3mydj7pr6dcDRe/aoF8U78Mj94Yjdko9tgs9PZkizhaQq12KhF/TUt6BwjY4pAJd3JPGA4zIZjxZtkBPghCMhMqlcN4fb+QITq5XOrmYtuPymf0eYqGMX19z7PRXQunBgQ4OmFR32Uf0O8Av0CESyG+KxVGOX4QCoUoCNLfLhNmsRzWMDnHhd/+nsbs68eask9jVUegfo0AX+P7DFYIssGqEvHf0oje/LrQmkulcjqKPthM6CyGIOgBaj170zB2bUa6ZjwrCMJrcrQnXM6a/jb2fQZ++ZX2Iehbljbam9FRg4+boD4FxeITKLyKZsBII1YigYOk1wqvXD48RutKEwMdMkFBWMTEyGg5mxWEwDbPO9SMjX0DY4YAFeFVx8Fl9tcCuv36+AYTCstE+1coUxYI7/ocEx8BznWPJMUu8XbvPniC1J0WNjkEQUfkQuzS7wkVBDdDW2CbMXYGTSiNsfHvMVO3fo1cbfzCxzJAXWVBqfQLmhpA1VQCRbXafPaM5eGaa2LqJAJjHYIQHJFB+gY2NCsRvhk7gamR4b80/XyLPIFLBgBlVVJ8NYx/hEcCXep0CfDV6hl8VX4RmbDPP1ROC27Vxy6HIKwjdZUJWg6BDa0GJPEuXZt7/1+5G1yDrCr9RpGgRkcNa9o0/YT1AlJOtegSIFIcAnylsohMuJIgHBUndqON4Q5BUCacZmxbG2NgQ3tlLmQbX55mzHn41nTjtWFoLr299xLtCyEoWuKRILqJEuCr1RPArmVjPJ4jsivXZeT7xQ9Crfag6e1dB0I2yQaamSWge944vlzKmHuzuDIFoKhq9uy5gohfxiAJojJRrXYEGu+yKb6O4+d64Cfe7spRBKIQMXSqRmbwzxmFwvnYdjJypZsqs0S2OizTn3A6rPJ9ymBtKcR6+ctHuGBcYvJFHY0RXyQ4Lko04fsJwBnGVPUPFOd6lcoR3tatfXHGfWl7W7b0kl2Hm3L5fOy5Ax1nIsf/cQN1VpEtwtvM/NWMWWEdeKB+oS5cE8j4JmSEsAYHea/unsOmuBZcxBspANUoogmvbJiDscsw9C5zwAGrMH6+frSs3/EziwXAaoxKNUQDit4LLwx6Y2OvZOw8c/DBK3HiDmAJmTYnHCJdYTNRRXgbm2/g9rok8MG0/JPhLYkiWP39WxG0mGj+Wn1AYyJFdBtFeEFA8/wvPz9FIK7n3n2fGRhYa8pVzeIpOPdunDuceo43Pv4qsuX11O+BvgBHz+FGdzU79t8Yey3wBfQfGmoJZJvk6RWjSb/B1t+AW2z19T1F3bYEA9qyGOMHoVbT7/AvMeQ4oHEOdVYRTXgZKyjggK6qx5lqeSnZcSVH7e04di/1gzj8ALh76N8BfQ1tZc9JjNHTnDZVyRAY/iLZNBNFdJsx4+xblyL365NxXhJaCRQtAX4qjY1diIKzOVZ0ROZCBikPm4lKsgWiRyAGPaXpRYVetx8AQjCITH3/EG2eEb9qyRDA2lREF9Jm/NNseEvY8L7n22om92dPji3g8jfGUulnnP0f5WIRvUSRDBkiCBiTn6JHIIr42oF4In7V6qdB44UT3TG5/AZsOoXJ+Vm7DU8D0iABaVzbPsdJjfS6hw3pZBR+hQvGRgZIjoCmf1xGBqqfBvG1gzR/1JdMgfoa7zLrjzHrS43nLsCmv2Cb7i2iTxokaNLMcUY/zUqln7PhzCcQKzAm2nAkU+DCHwe6UyrpsZIpcNH1JHqXAycCK/0fTU9J9ASzBE70ptgi4nX9ZwgBOA9DPkj9DTLiX4gpA5IdB1BTKsmxutHpTU6xeCG6TmDmv2f19DyKDVOe9bgVUhLvVaTqYAAAAJNJREFU71MbIyoY8wgBuIyl8QFq/WvLTwnGgwjU4/UOIweM0cnhgmtX5NAIDNuZ6aeA+5G3Eoc/Rvu91N+VLnSKD7b9Kx0JQGQCRtWt6dNfxMAN3L2/BX4uF5KTaV/AK6gbmblNJl+oEBgXZyCHxbIMOMPGWsPZh4BrGPMd+h+B78P0lyLzNj3MWBZvr8JhqvYX/g8AAP//Q+jZlwAAAAZJREFUAwCq0DmZnmoBZQAAAABJRU5ErkJggg==" />
                                </defs>
                            </svg>

                            Yes, Block
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

