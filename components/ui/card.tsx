import React from "react";
import Head from "next/head";

interface CardTitleType {
    title: string;
}
const CardTitle = ({ title }: CardTitleType) => {
    return <div className="font-bold text-gray-900 text-lg">{title}</div>;
};

interface CardHeaderType {
    children: React.ReactNode;
}

const CardHeader = ({ children }: CardHeaderType) => {
    return (
        <div className="flex flex-row md:flex-col md:justify-between items-center border-b border-1 border-gray-400">
            {children}
        </div>
    );
};

interface CardBodyTypes {
    children: React.ReactElement;
}
const CardBody = ({ children }: CardBodyTypes) => {
    return <div className="bg-gray-100">{children}</div>;
};

interface CardType {
    title: string;
    header?: React.ReactElement;
    body: React.ReactElement;
}

const Card = ({ title, header, body }: CardType) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="m-4 border border-1 border-gray-300 bg-gray-100">
                {/* card header */}
                {header}
                {/* card body */}
                {body}
            </div>
        </div>
    );
};

export { CardTitle, CardHeader, CardBody, Card };
