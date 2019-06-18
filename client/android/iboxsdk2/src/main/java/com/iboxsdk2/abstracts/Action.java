package com.iboxsdk2.abstracts;

@FunctionalInterface
public interface Action<T> {
    void Action(T data);
}
