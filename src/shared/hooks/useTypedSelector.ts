import { TypedUseSelectorHook, useSelector } from "react-redux"

import { type TRootState } from "@/store"

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector
