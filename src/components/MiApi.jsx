import React, { useEffect, useState } from 'react';

const MiApi = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const getData = async () => {
        try {
            const res = await fetch(
                'https://api.nasa.gov/planetary/apod?count=10&api_key=X9gFM54jKKh3p0cUKifRRFS8Iy8I7AM542PhMnxq'
            );
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const filterExplanation = data.filter((data) =>
        data.explanation.includes(search)
    );

    return (
        <div className='background-black'>

            <div 
            className='input background-black'>

                <input
                    className=' mb-4 align-self-center justify-content-center px-3 search form-label width-label'
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    value={search}
                    placeholder="Search..."
                />
            </div>

            <div className="row background-black">
                {filterExplanation.map((data) => {
                    return (
                        <div
                            key={data.date}
                            className="background-black col-md-6 d-flex justify-content-center"
                        >
                            <div className="background-black container col-12 my-3">
                                <div className="row">
                                    <div className=" background-black col-md-12">
                                        <div className="card">
                                            <div className="card-body background-black">
                                                <h5 className="color-white  card-title p-3 background-black">{data.title}</h5>
                                                <img
                                                    className="card-image p-3"
                                                    src={data.url}
                                                    alt={data.title}
                                                />
                                                <p className=" color-white card-text p-3">{data.explanation}.</p>
                                                <a
                                                    href={data.url}
                                                    className="mb3 px-3 btn btn-light mx-3 width-label"
                                                >
                                                    Go to the photo
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MiApi;
