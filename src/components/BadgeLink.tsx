import React from 'react';
import { Badge } from 'react-bootstrap';
import './BadgeLink.scss';

interface BadgeLinkProps {
  linkType: string;
  url: string;
  content: string;
}

const BadgeLink = ({ linkType, url, content }: BadgeLinkProps) => {
  return (
    <Badge
      className={`badgelink`}
      bg={linkType}
      as='a'
      href={url}
      target='_blank'
      rel='noreferrer'>
      {content}
    </Badge>
  )
}

export default BadgeLink;