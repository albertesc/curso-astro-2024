import { useState } from 'react';

export function Accordion({ title, children }) {
    const [active, setActive] = useState(false);

    const classActive = active ? 'block' : 'hidden';
    const classIconActive = active ? 'transform rotate-180' : '';

    return (
        <div className={`w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-300 text-gray-600`}>
            <button className="flex items-center justify-between w-full text-lg" onClick={() => setActive(!active)}>
                {title}
                <svg className={`${classIconActive} transition w-4 h-4 text-gray-600`} x="0px" y="0px" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"></path>
                </svg>
            </button>

            <div className={classActive}>
                {children}
            </div>
        </div>
    );
}