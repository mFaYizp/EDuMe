import { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  keywords: string;
  route: string;
  setRoute: (route: string) => void;
}

const Heading: FC<HeadProps> = ({
  title,
  description,
  keywords,
  route,
  setRoute,
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};

export default Heading;
