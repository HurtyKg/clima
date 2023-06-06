import { useState } from 'react';
import { CardClima } from "../components/clima";



  export function Home() {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  
    return (
      <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <CardClima setBackgroundImage={setBackgroundImage} />
      </div>
    );
  }
  





