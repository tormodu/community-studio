import S from '@sanity/desk-tool/structure-builder'
import ThreadPreview from './schemas/components/threadPreview'
import documentStore from 'part:@sanity/base/datastore/document'
import { map } from 'rxjs/operators'

const hiddenDocTypes = listItem =>
  !['person', 'ticket', 'tagOption'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Tickets')
        .schemaType('ticket')
        .child(
          S.documentList('ticket')
            .title('Tickets')
            .filter('_type == $type')
            .params({ type: 'ticket' })
            .child(docId =>
              S.document()
                .documentId(docId)
                .views([
                  S.view.form(),
                  S.view.component(ThreadPreview).title('Threads')
                ])
            )
        ),
      S.listItem()
        .title('Tickets by tags')
        .child(() =>
          documentStore.listenQuery('*[_type == "ticket"]').pipe(
            map(docs => {
              const tags = docs.reduce(
                (acc, curr = { tags: [] }) =>
                  curr.tags
                    ? Array.from(
                      new Set([
                        ...acc,
                        ...curr.tags.map(({ value }) => value)
                      ])
                    )
                    : acc,
                []
              )

              return S.list()
                .title('Tickets by tags')
                .items(
                  tags.map(tag =>
                    S.listItem()
                      .title(tag)
                      .child(() =>
                        documentStore
                          .listenQuery(
                            '*[_type == "ticket" && $tag in tags[].value]',
                            { tag }
                          )
                          .pipe(
                            map(documents =>
                              S.documentTypeList('ticket')
                                .title(`Tickets for ${tag}`)
                                .filter(`_id in $ids`)
                                .params({
                                  ids: documents.map(({ _id }) => _id)
                                })
                            )
                          )
                      )
                  )
                )
            })
          )
        ),
      S.listItem()
        .title('Tags')
        .schemaType('tagOption')
        .child(
          S.documentList('tagOption')
            .title('Tags')
            .menuItems(S.documentTypeList('tagOption').getMenuItems())
            .filter('_type == $type')
            .params({ type: 'tagOption' })
        ),
      S.listItem()
        .title('Persons')
        .schemaType('person')
        .child(
          S.documentList('person')
            .title('Persons')
            .filter('_type == $type')
            .params({ type: 'person' })
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])