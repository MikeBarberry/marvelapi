import styled from 'styled-components';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';

const StyledLink = styled(Link)`
  background-color: #404040;
  color: white;
  font-size: 25px;
  font-weight: bold;
  font-family: Arial;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  position: absolute;
  top: 100px;
  right: 85px;
  &:hover {
    opacity: 0.5;
  }
`;

const StyledLoadingButton = (props) => {
  return (
    <LoadingButton
      sx={{
        backgroundColor: '#404040',
        color: 'white',
        fontSize: '25px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        padding: '10px 60px',
        borderRadius: '5px',
        margin: '10px 0px',
        cursor: 'pointer',
      }}
      {...props}></LoadingButton>
  );
};

module.exports = {
  StyledLink,
  StyledLoadingButton,
};
