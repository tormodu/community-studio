import React from 'react';
import PlusIcon from 'part:@sanity/base/plus-icon';
import S from '@sanity/desk-tool/structure-builder';
import client from 'part:@sanity/base/client';
import Spinner from 'part:@sanity/components/loading/spinner';
import {useRouter} from 'part:@sanity/base/router';

import Icon from '../schemas/components/icon';

export const CONTRIBUTIONS = [
  'contribution.guide',
  'contribution.tool',
  'contribution.starter',
  'contribution.showcaseProject',
];

/**
 * Gets a personalized document list for the currently logged user
 */
function getDocumentListItem(type) {
  const defaultListItem = S.documentTypeListItem(type);
  const defaultDocList = S.documentTypeList(type);
  return S.listItem()
    .id(type)
    .schemaType(type)
    .title(defaultListItem.getTitle())
    .icon(defaultListItem.getIcon())
    .child(
      S.documentList()
        .id(type)
        .schemaType(type)
        .title(defaultListItem.getTitle())
        .filter('_type == $type && $userId in authors[]._ref')
        .params({userId: window._sanityUser?.id, type})
        .menuItems([
          {
            title: 'Create new',
            icon: PlusIcon,
            intent: {
              type: 'create',
              params: {
                type: type,
                template: type,
              },
            },
            showAsAction: true,
          },
          ...defaultDocList.getMenuItems(),
        ])
    );
}

/**
 * This is a function instead of a plain array to make sure we get the freshest window._sanityUser
 */
export const getCommunityStructure = () => [
  ...CONTRIBUTIONS.map((type) => getDocumentListItem(type)),
  S.divider(),
  S.listItem()
    .title('All your contributions')
    .icon(() => <Icon emoji="🌌" />)
    .id('all')
    .child(
      S.documentList()
        .id('all')
        .title('All your contributions')
        .filter('_type match "contribution.**" && $userId in authors[]._ref')
        .params({userId: window._sanityUser?.id})
    ),
  S.documentListItem().schemaType('person').id(window._sanityUser?.id).title('Your profile'),
  S.listItem()
    .title('See your profile live')
    .icon(() => <Icon emoji="🌐" />)
    .child(
      S.component()
        .id('profile-preview')
        .component(() => {
          // Simple component to open the contributor's profile on another tab
          const [status, setStatus] = React.useState({state: 'loading'});
          const router = useRouter();

          async function fetchContributor() {
            const person = await client.fetch('*[_type == "person" && _id == $id][0]', {
              id: window._sanityUser?.id,
            });
            setStatus({state: 'idle', person});
          }

          React.useEffect(() => {
            setStatus({state: 'loading'});
            fetchContributor();
          }, []);

          React.useEffect(() => {
            if (status.person?.handle?.current) {
              const url = `https://www.sanity.io/community/people/${status.person?.handle?.current}`;

              // Open their profile in the Sanity site
              window.open(url, '_blank');
              // And go back to the person's profile
              router.navigateIntent('edit', {id: window._sanityUser?.id});
            }
          }, [status.person]);

          if (status.state === 'loading' || status.person?.handle?.current) {
            return (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                }}
              >
                <Spinner />
              </div>
            );
          }

          // @TODO: improve error handling with an IntentLink to edit their profile
          return (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h1 style={{margin: 0}}>Your profile isn't published yet</h1>
              <p>You can do so by clicking on it in the sidebar :)</p>
            </div>
          );
        })
    ),
];
