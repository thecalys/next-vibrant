import { useEffect, useState } from 'react';
import { wait } from '~/lib/utils';

/*
document.querySelector<HTMLImageElement>(`.${imageClass}`)
*/

export const useElementQuery = <ElemType extends Element>(query: string) => {
    const [element, setElement] = useState<ElemType | undefined>(document?.querySelector?.<ElemType>(query) || undefined);

    useEffect(() => {
        let q = document.querySelector<ElemType>(query);
        setElement(q);
    }, [query]);

    return element;
}