import React from "react";

interface Props {
    // define your props here
}

const QuotationDetail: React.FC<Props> = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-black bg-cover h-10 text-white pt-2">
                <div className="container flex flex-row justify-between my-auto">
                    <p className="logo">Domus Logo here</p>
                    <div className="mr-20">
                        {/* {userInfo.name} */}
                    </div>
                </div>
            </header>
            <div className="flex-1 container">
                DETAIL
            </div>
            <footer className="bg-black bg-cover h-10"></footer>
        </div>
    )
}

export default QuotationDetail