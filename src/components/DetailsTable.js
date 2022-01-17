import React from 'react';

export const DetailsTable = (props) => {
    const tableHeadersArray = [
        'Tenent',
        'Start Date',
        'End Date',
        'Lease Status',
        'Primary Contact'
    ]

    const {propertyData} = props;

    const getPrimaryContact = (contactsObject) => {
        let primaryContact
        for (const [name, obj] of Object.entries(contactsObject)) {
            if (obj.tags.includes('PRIMARY')) {
                primaryContact = (
                    <div className='contactInfo'>
                        <div className='contactName bold'>{name}</div>
                        <div className='contactPhone'>phone: {obj.phone}</div>
                        <div className='contactEmail'>email: {obj.email}</div>
                    </div>
                )
                break;
            }
        }
        return primaryContact;
    }

    return (
        <section>
            <table id='detailsTable'>
                <tr className='detailsHeaderRow'>
                    {tableHeadersArray.map((header) => {
                        return <th>{header}</th>
                    })}
                </tr>
                {
                    propertyData.map((property) => {
                        return (
                            <tr className='detailsRow'>
                                <td>{property.companyName}</td>
                                <td>{property.startDate}</td>
                                <td>{property.inclusiveEndDate}</td>
                                <td>{property.status}</td>
                                <td>{getPrimaryContact(property.contacts)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </section>
    )

}

export default DetailsTable;