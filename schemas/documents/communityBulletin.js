import React from 'react';
import Icon from '../components/icon';

export default {
  name: 'communityBulletin',
  title: 'Community bulletin',
  icon: () => <Icon emoji="📰" />,
  type: 'document',
  fields: [
    {
      name: 'headerTitle',
      title: 'Title in the header of the bulletin',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'headerBody',
      type: 'array',
      title: 'Paragraph below title. Keep it short!',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
        },
      ],
    },
    {
      name: 'seoTitle',
      title: 'Title for SEO',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 1,
    },
    {
      name: 'frameworks',
      title: 'Highlighted frameworks',
      description: 'Choose the 5 most popular',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Reference to framework',
          to: [{type: 'taxonomy.framework'}],
        },
      ],
      validation: (Rule) => [
        Rule.required()
          .min(4)
          .max(5)
          .error('Required field with at least 4 and at most 5 entries.'),
        Rule.unique(),
      ],
    },
    {
      name: 'frameworksTitle',
      type: 'string',
      title: 'Title above frameworks',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredProjectTitle',
      type: 'string',
      title: 'Title for featured project section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredProjectCta',
      type: 'string',
      title: 'CTA for projects page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latestToolsTitle',
      type: 'string',
      title: 'Title for latest tools section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latestToolsCta',
      type: 'string',
      title: 'CTA for tools page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latestStartersTitle',
      type: 'string',
      title: 'Title for latest starters section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latestStartersCta',
      type: 'string',
      title: 'CTA for starters page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latestGuidesTitle',
      type: 'string',
      title: 'Title for latest guides section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latestGuidesCta',
      type: 'string',
      title: 'CTA for all guides pages',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'activeContributorsTitle',
      type: 'string',
      title: 'Title for recently active contributors section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'activeContributorsCta',
      type: 'string',
      title: 'CTA for people directory',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      type: 'array',
      title: 'Rich text below auto-generated content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
        },
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              title: 'Visible caption below the image',
              type: 'string',
              options: {
                isHighlighted: true,
              },
            },
            {
              name: 'alt',
              title: 'Alternative text for screen readers',
              description:
                '⚡ Optional but highly encouraged to help make the content more accessible',
              type: 'string',
              options: {
                isHighlighted: true,
              },
            },
          ],
          options: {
            storeOriginalFilename: false,
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Community bulletin`,
      };
    },
  },
};
