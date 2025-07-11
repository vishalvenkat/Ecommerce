import { Helmet } from "react-helmet-async";

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Potti Kadai",
  description: "We sell the best products for cheap",
};
export default Meta;
