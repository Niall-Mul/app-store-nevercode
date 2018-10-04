import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Image } from 'semantic-ui-react';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';
import { ButtonLink } from '../types/ButtonLink';

interface Props {
  quoteType: string;
  className?: string;
  buttonLinks: ButtonLink[];
}

class ButtonGroupCard extends React.Component<Props> {
  render() {
    const { className, quoteType, buttonLinks } = this.props;
    return (
      <div className={className}>
        <Container textAlign="center" className="quoteContainer">
          <Image
            src={`${assetsUriPrefix}assets/${quoteType}-blue.png`}
            className="quoteImage"
          />
          <Button.Group vertical fluid>
            {this.props.buttonLinks.map((item, idx) => {
              return (
              <Button
                key={idx}
                as={Link}
                to={item.linkTo}
                primary
                fluid
                size="huge"
                content={item.content}
                className={`defaultButton ${item.background}Background`}
              />
              );
            }  
            )
          }     
          </Button.Group>
        </Container>
      </div>
    );
  }
}

export default ButtonGroupCard;