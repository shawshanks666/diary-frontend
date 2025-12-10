import React from 'react';


const Landing = () => {

    return (
        <div className="landing">
            <div className="navbar">
                <a href="/">Diarie</a>
                <a href="/login">Login</a>
            </div>
            <div className="landing-child-1">
                <div className="hero-container">
                    <div className="hero-title-container">
                        <div className="hero-title">
                            <span>Write freely.</span>
                            <span>Feel deeply.</span>
                            <span>Understand yourself.</span>
                            <div className="hero-title-child">
                                <span>Write freely.</span>
                                <span>Feel deeply.</span>
                                <span>Understand yourself.</span>
                        </div>
                        </div>
                        <div className="hero-subtitle">Track your mood, reflect on your day, and build emotional awareness — one entry at a time.</div>
                    </div>
                    <div className='book'>
                        <a href='/login'>Start Journaling Today →</a>
                    </div>
                </div>
            </div>

            <div className="landing-child-2">

                <div className='hero-title'> What Diarie Does</div>
                <div className='feature-container'>
                    <div className='feature'>
                        <div className='feature-title'>Daily Streak Tracking</div>
                        <div className='feature-body'>Stay motivated with streaks that help build a journaling habit.</div>
                    </div>

                    <div className='feature'>
                        <div className='feature-title'>Daily Streak Tracking</div>
                        <div className='feature-body'>Stay motivated with streaks that help build a journaling habit.</div>
                    </div>
                    <div className='feature'>
                        <div className='feature-title'>Daily Streak Tracking</div>
                        <div className='feature-body'>Stay motivated with streaks that help build a journaling habit.</div>
                    </div>
                    <div className='feature'>
                        <div className='feature-title'>Daily Streak Tracking</div>
                        <div className='feature-body'>Stay motivated with streaks that help build a journaling habit.</div>
                    </div>

                </div>
            </div>
            <div className='landing-child-3'>
            </div>
        </div>
    )
}

export default Landing;