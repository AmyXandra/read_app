import React from 'react';
export function NormalTextIcon({ fill = '#FF5841' }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='17' fill='none' viewBox='0 0 18 17'>
      <path
        fill={fill}
        d='M3.013 12.38a1.126 1.126 0 01.323.902 12.34 12.34 0 01-.448 2.25c1.57-.364 2.528-.784 2.963-1.005.247-.125.531-.154.799-.083A9.065 9.065 0 009 14.75c4.495 0 7.875-3.158 7.875-6.75 0-3.591-3.38-6.75-7.875-6.75S1.125 4.409 1.125 8c0 1.652.694 3.184 1.888 4.38zm-.555 4.394c-.266.053-.534.101-.802.145-.225.036-.396-.198-.307-.407.1-.236.191-.475.274-.717l.004-.011c.279-.81.506-1.742.59-2.609C.835 11.791 0 9.98 0 8 0 3.65 4.03.125 9 .125S18 3.651 18 8c0 4.35-4.03 7.875-9 7.875-.891.001-1.78-.114-2.64-.344-.585.296-1.844.835-3.902 1.243z'
      ></path>
      <path
        fill={fill}
        d='M4.5 5.188a.563.563 0 01.563-.563h7.875a.562.562 0 110 1.125H5.061a.563.563 0 01-.562-.563zM4.5 8a.563.563 0 01.563-.563h7.875a.562.562 0 110 1.125H5.061A.563.563 0 014.5 8zm0 2.813a.562.562 0 01.563-.563h4.5a.563.563 0 010 1.125h-4.5a.563.563 0 01-.563-.563z'
      ></path>
    </svg>
  );
}

export function ThinkingIcon({ fill = '#FF5841' }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 18 18'>
      <path
        fill={fill}
        d='M9 1.8c-.866 0-1.548.218-2.075.578a3.186 3.186 0 00-1.089 1.314c-.297.635-.392 1.293-.423 1.723-.581.044-1.179.183-1.67.51C3.099 6.358 2.7 7.07 2.7 8.1s.398 1.743 1.044 2.174c.614.41 1.395.526 2.106.526h6.3c.703 0 1.485-.1 2.102-.504.653-.427 1.048-1.143 1.048-2.196 0-1.031-.398-1.743-1.044-2.174-.492-.328-1.088-.467-1.67-.51-.03-.43-.126-1.089-.422-1.725a3.199 3.199 0 00-1.089-1.314C10.548 2.019 9.865 1.8 9 1.8zM6.3 5.85c0-.219.002-1.031.35-1.778.172-.367.421-.704.782-.95C7.792 2.875 8.29 2.7 9 2.7c.709 0 1.208.176 1.568.421.36.247.609.584.78.95.349.748.352 1.56.352 1.78a.45.45 0 00.45.449c.639 0 1.208.109 1.606.374.366.244.644.657.644 1.426 0 .8-.281 1.208-.64 1.443-.396.259-.963.357-1.61.357h-6.3c-.64 0-1.209-.109-1.607-.374C3.877 9.282 3.6 8.869 3.6 8.1c0-.769.277-1.182.643-1.426.398-.265.968-.374 1.607-.374a.45.45 0 00.45-.45zM7.2 15.3a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zm0-.9a.9.9 0 110-1.8.9.9 0 010 1.8zM3.15 16.2a1.35 1.35 0 100-2.7 1.35 1.35 0 000 2.7zm0-.9a.45.45 0 110-.9.45.45 0 010 .9z'
      ></path>
    </svg>
  );
}

export function DeleteIcon({ fill = '#FF5841' }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 18 18'>
      <path
        fill={fill}
        d='M7.643 3.922A5.34 5.34 0 019 3.75 5.25 5.25 0 0114.25 9c.001.458-.057.914-.172 1.357a.752.752 0 00.525.923.86.86 0 00.195 0 .75.75 0 00.75-.555c.142-.564.21-1.144.202-1.725A6.75 6.75 0 009 2.25a6.683 6.683 0 00-1.747.225.75.75 0 00.39 1.447zm8.64 11.295l-13.5-13.5a.753.753 0 00-1.065 1.065L3.75 4.785a6.75 6.75 0 000 8.43l-1.282 1.252a.75.75 0 00-.158.818.75.75 0 00.69.465h6a6.75 6.75 0 004.215-1.5l2.003 2.01a.751.751 0 001.065 0 .75.75 0 000-1.043zM9 14.25H4.808l.48-.473a.75.75 0 000-1.057A5.25 5.25 0 014.8 5.857l7.343 7.343A5.25 5.25 0 019 14.25z'
      ></path>
    </svg>
  );
}

export function TypingIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 18 18'>
      <path
        fillRule='evenodd'
        stroke='#FF5841'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.428 14.158c3.787 0 6.858-2.594 6.858-5.793 0-3.2-3.07-5.793-6.858-5.793-3.786 0-6.857 2.593-6.857 5.793 0 1.249.468 2.406 1.265 3.351L3 15.643l3.356-2.098a7.868 7.868 0 003.072.613z'
        clipRule='evenodd'
      ></path>
      <path
        fill='#FF5841'
        fillRule='evenodd'
        d='M9.427 9.429c.429 0 .858-.429.858-.857 0-.43-.429-.858-.858-.858-.428 0-.856.429-.856.857 0 .43.428.858.856.858zM6 9.429c.428 0 .857-.429.857-.857 0-.43-.429-.858-.857-.858-.429 0-.856.429-.856.857 0 .43.427.858.856.858zm6.857 0c.429 0 .858-.429.858-.857 0-.43-.429-.858-.857-.858-.429 0-.857.429-.857.857 0 .43.428.858.857.858h-.001z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export function AddMediaIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='20' fill='none' viewBox='0 0 20 17'>
      <path
        fill='#212D40'
        d='M18.148 2.593H15L14.25.49a.742.742 0 00-.7-.491h-7.1a.74.74 0 00-.698.49L5 2.594H1.852A1.851 1.851 0 000 4.444V15c0 1.023.829 1.852 1.852 1.852h16.296A1.851 1.851 0 0020 15V4.444a1.851 1.851 0 00-1.852-1.851zM18.333 15a.186.186 0 01-.185.185H1.852A.186.186 0 011.667 15V4.444c0-.101.083-.185.185-.185h4.322l.395-1.106.53-1.486h5.8l.53 1.486.395 1.106h4.324c.102 0 .185.084.185.185V15zM10 5.74a3.703 3.703 0 00-3.704 3.704A3.703 3.703 0 0010 13.148a3.703 3.703 0 003.704-3.704A3.703 3.703 0 0010 5.741zm0 5.927a2.223 2.223 0 11.001-4.446A2.223 2.223 0 0110 11.667z'
      ></path>
    </svg>
  );
}

export function AltTextIcon({ height = '22', width = '22', fill = '#212D40' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill={fill}
        d='M21.08 7.556h-3.7V7.06a.836.836 0 00-1.429-.592.836.836 0 00-.245.592v.496h-1.194a.838.838 0 00-.593 1.428c.157.156.37.245.592.245h3.628a8.419 8.419 0 01-1.797 4.616.835.835 0 001.044 1.277.837.837 0 00.251-.218 10.086 10.086 0 002.177-5.675h1.25a.838.838 0 00.785-1.15.836.836 0 00-.768-.523zM20.718 16.081a5.083 5.083 0 01-2.579-.702.838.838 0 00-1.116.306c-.77 1.511 2.757 2.091 3.723 2.069a.838.838 0 10-.028-1.673z'
      ></path>
      <path
        fill={fill}
        fillRule='evenodd'
        d='M10.984 3.548h11.063A1.877 1.877 0 0124 5.298v16.927a1.873 1.873 0 01-1.953 1.773h-9.78a.86.86 0 01-.836-.78l-.207-2.788h-9.27A1.877 1.877 0 010 18.68V1.774A1.873 1.873 0 011.953.002h7a.9.9 0 01.463.14.926.926 0 01.312.373l1.256 3.033zm3.69 18.755h7.373a.319.319 0 00.279-.117V5.321a.363.363 0 00-.28-.1H11.683l5.81 14.044a.884.884 0 01.045.54v.079a.235.235 0 01-.028.067c-.011.027-.04.078-.04.078a.467.467 0 01-.044.067l-.056.06a.316.316 0 01-.061.062c-.046.046-1.041.83-1.796 1.423-.447.352-.81.637-.838.662zm-6.055-8.865c.266.921.578 1.382.938 1.382a.592.592 0 00.416-.17.553.553 0 00.181-.421c0-.106-.056-.316-.17-.632l-.334-.925-.873-4.068-.369-1.967c-.113-.429-.324-.644-.633-.644-.226 0-.802.74-1.728 2.219a48.645 48.645 0 00-1.688 2.88c-.382.09-.574.292-.574.608 0 .133.033.25.1.351-.59 1.237-.885 1.95-.885 2.137 0 .167.06.308.182.421.125.113.265.17.422.17.214 0 .384-.11.51-.328.472-.983.806-1.73 1.001-2.242l1.559-.322c.644-.14 1.166-.238 1.564-.292.153.878.28 1.492.381 1.843zm-2.806-2.61L7.487 8.13l.475 2.26c-.961.17-1.678.317-2.15.438z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export function NarrationIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' fill='none' viewBox='0 0 19 19'>
      <path
        fill='#FF5841'
        d='M4.813 4.125a.688.688 0 00-.688.688v1.375a.687.687 0 001.099.55c-.278.917-.692 1.506-.898 1.713a.688.688 0 10.973.973c.59-.591 1.576-2.233 1.576-4.611a.688.688 0 00-.688-.688H4.813zm4.125 0a.688.688 0 00-.688.688v1.375a.687.687 0 001.099.55c-.278.917-.692 1.506-.898 1.713a.688.688 0 10.973.973C10.014 8.833 11 7.191 11 4.813a.687.687 0 00-.688-.688H8.938zM0 2.75A2.75 2.75 0 012.75 0h9.625a2.75 2.75 0 012.75 2.75V11a2.75 2.75 0 01-2.75 2.75h-2.172l-2.035 3.765a.688.688 0 01-1.21.002l-2.06-3.767H2.75A2.75 2.75 0 010 11V2.75zm2.75-1.375A1.375 1.375 0 001.375 2.75V11a1.375 1.375 0 001.375 1.375h2.555a.687.687 0 01.603.357l1.65 3.017 1.631-3.014a.687.687 0 01.605-.36h2.581A1.375 1.375 0 0013.75 11V2.75a1.375 1.375 0 00-1.375-1.375H2.75zM.687 16.5h4.149l.752 1.375h-4.9a.687.687 0 110-1.375zm20.625 1.375H9.537l.742-1.375h11.034a.687.687 0 110 1.375zM.688 20.625a.687.687 0 100 1.375h13.75a.687.687 0 100-1.375H.688z'
      ></path>
    </svg>
  );
}

export function LineBreakIcon() {
  return (
    <svg
      className='w-5 h-5'
      fill='none'
      stroke='#FF5841'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 8h16M4 16h16' />
    </svg>
  );
}

export function CoverPhotoDefault() {
  return (
    <svg
      className='mx-auto h-12 w-12 text-gray-400'
      stroke='currentColor'
      fill='none'
      viewBox='0 0 48 48'
      aria-hidden='true'
    >
      <path
        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
