'use client'

import React from 'react'
import ActionMenu from '@/components/ActionMenu'

const MenuPanel = ({
    children,
}: {
    children: React.ReactNode,
}) => {

    const styles = {
        container: {
            position: 'absolute' as const,
            top: '0px',
            left: '0px',
            display: 'flex',
            flexDirection: 'row' as const,
        }
    }

    return (
        <div style={styles.container}>
            {children}
        </div>
    )
}

const Container = ({
    children,
}: {
    children: React.ReactNode,
}) => {

    const menuLayoutItems = [
        {
            label: '+ Rows',
            key: 'rows',
            action: () => {
                console.log('+ Rows');
            },
        },
        {
            label: '+ Columns',
            key: 'columns',
            action: () => {
                console.log('+ Columns');
            },
        },
    ]

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 182, 193, 0.1)',
        }
    }

    return (
        <div
            style={styles.container}
        >
            <MenuPanel>
                <ActionMenu
                    label='⚏'
                    labelTooltip='Layout'
                    menuItems={menuLayoutItems}
                />
                <ActionMenu
                    label='⚏'
                    labelTooltip='Layout'
                    menuItems={menuLayoutItems}
                />
            </MenuPanel>
            
            {children}
        </div>
    )
}

const CastingSpells = () => {
    return (
        <Container>
            <div>
                <h1>Casting Spells</h1>
            </div>
        </Container>
    )
}

export default CastingSpells;